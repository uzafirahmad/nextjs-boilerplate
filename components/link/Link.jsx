// "use client";

// import NextLink from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";

// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function imgExtractor(href) {
//     // Fetch the page content
//     const url = new URL(href, window.location.href);
//     const response = await fetch(href);

//     if (!response.ok) {
//         console.error('Failed to fetch page');
//         return [];
//     }

//     // Parse the HTML
//     const html = await response.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     const images = Array.from(doc.querySelectorAll('img'))
//         .map((img) => ({
//             srcset: img.getAttribute("srcset") || img.getAttribute("srcSet"), // Linkedom is case-sensitive
//             sizes: img.getAttribute("sizes"),
//             src: img.getAttribute("src"),
//             alt: img.getAttribute("alt"),
//             loading: img.getAttribute("loading"),
//         }))
//         .filter((img) => img.src);
//     return images
// }

// async function prefetchImages(href) {
//     if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
//         return [];
//     }

//     const images = await imgExtractor(href)

//     return images;
// }

// const seen = new Set();

// export const Link = (({ children, ...props }) => {
//     const [images, setImages] = useState([]);
//     const [preloading, setPreloading] = useState([]);
//     const linkRef = useRef(null);
//     const router = useRouter();
//     let prefetchTimeout = null; // Track the timeout ID

//     useEffect(() => {
//         if (props.prefetch === false) {
//             return;
//         }

//         const linkElement = linkRef.current;
//         if (!linkElement) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const entry = entries[0];
//                 if (entry.isIntersecting) {
//                     // Set a timeout to trigger prefetch after 1 second
//                     prefetchTimeout = setTimeout(async () => {
//                         router.prefetch(String(props.href));
//                         await sleep(0); // We want the doc prefetches to happen first.
//                         void prefetchImages(String(props.href)).then((images) => {
//                             setImages(images);
//                         }, console.error);
//                         // Stop observing once images are prefetched
//                         observer.unobserve(entry.target);
//                     }, 300); // 300ms delay
//                 } else if (prefetchTimeout) {
//                     // If the element leaves the viewport before 1 second, cancel the prefetch
//                     clearTimeout(prefetchTimeout);
//                     prefetchTimeout = null;
//                 }
//             },
//             { rootMargin: "0px", threshold: 0.1 }, // Trigger when at least 10% is visible
//         );

//         observer.observe(linkElement);

//         return () => {
//             observer.disconnect(); // Cleanup the observer when the component unmounts
//             if (prefetchTimeout) {
//                 clearTimeout(prefetchTimeout); // Clear any pending timeouts when component unmounts
//             }
//         };
//     }, [props.href, props.prefetch]);

//     return (
//         <NextLink
//             ref={linkRef}
//             prefetch={false}
//             onMouseEnter={() => {
//                 router.prefetch(String(props.href));
//                 if (preloading.length) return;
//                 const p = [];
//                 for (const image of images) {
//                     const remove = prefetchImage(image);
//                     if (remove) p.push(remove);
//                 }
//                 setPreloading(p);
//             }}
//             onMouseLeave={() => {
//                 for (const remove of preloading) {
//                     remove();
//                 }
//                 setPreloading([]);
//             }}
//             onMouseDown={(e) => {
//                 const url = new URL(String(props.href), window.location.href);
//                 if (
//                     url.origin === window.location.origin &&
//                     e.button === 0 &&
//                     !e.altKey &&
//                     !e.ctrlKey &&
//                     !e.metaKey &&
//                     !e.shiftKey
//                 ) {
//                     e.preventDefault();
//                     router.push(String(props.href));
//                 }
//             }}
//             {...props}
//         >
//             {children}
//         </NextLink>
//     );
// });

// function prefetchImage(image) {
//     if (image.loading === "lazy" || seen.has(image.srcset)) {
//         return;
//     }
//     const img = new Image();
//     img.decoding = "async";
//     img.fetchPriority = "low";
//     img.sizes = image.sizes;
//     seen.add(image.srcset);
//     img.srcset = image.srcset;
//     img.src = image.src;
//     img.alt = image.alt;
//     let done = false;
//     img.onload = img.onerror = () => {
//         done = true;
//     };
//     return () => {
//         if (done) return;
//         img.src = img.srcset = "";
//         seen.delete(image.srcset);
//     };
// }

// export default Link;
























"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const prefetchedLinks = new Set(); // Tracks prefetched links globally
const seen = new Set();

export const Link = (({ children, ...props }) => {
    const [images, setImages] = useState([]);
    const [preloading, setPreloading] = useState([]);
    const linkRef = useRef(null);
    const router = useRouter();
    let prefetchTimeout = null; // Track the timeout ID


    useEffect(() => {
        // if (props.prefetch === false) {
        //     return;
        // }

        const linkElement = linkRef.current;
        if (!linkElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !prefetchedLinks.has(props.href)) {
                    prefetchTimeout = setTimeout(async () => {
                        // if (!props.href.includes('sub-class') && !props.href.includes('collections')) {
                        prefetchedLinks.add(props.href);
                        // }
                        router.prefetch(String(props.href));
                        await sleep(0);
                        // void prefetchImages(String(props.href)).then((images) => {
                        //     setImages(images);
                        // }, console.error);
                        observer.unobserve(entry.target);
                    }, 300);
                } else if (prefetchTimeout) {
                    clearTimeout(prefetchTimeout);
                    prefetchTimeout = null;
                }
            },
            { rootMargin: "0px", threshold: 0 },
        );

        observer.observe(linkElement);

        return () => {
            observer.disconnect();
            if (prefetchTimeout) {
                clearTimeout(prefetchTimeout);
            }
        };
    }, [props.href, props.prefetch]);

    return (
        <NextLink
            ref={linkRef}
            prefetch={false}
            onMouseEnter={() => {
                if (!prefetchedLinks.has(props.href)) {
                    router.prefetch(String(props.href));
                }
                if (preloading.length) return;
                const p = [];
                for (const image of images) {
                    const remove = prefetchImage(image);
                    if (remove) p.push(remove);
                }
                setPreloading(p);
            }}
            onMouseLeave={() => {
                for (const remove of preloading) {
                    remove();
                }
                setPreloading([]);
            }}
            onMouseDown={(e) => {
                const url = new URL(String(props.href), window.location.href);
                if (
                    url.origin === window.location.origin &&
                    e.button === 0 &&
                    !e.altKey &&
                    !e.ctrlKey &&
                    !e.metaKey &&
                    !e.shiftKey
                ) {
                    e.preventDefault();
                    router.push(String(props.href));
                }
            }}
            {...props}
        >
            {children}
        </NextLink>
    );
});

function prefetchImage(image) {
    if (image.loading === "lazy" || seen.has(image.srcset)) {
        return;
    }
    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = "low";
    img.sizes = image.sizes;
    seen.add(image.srcset);
    img.srcset = image.srcset;
    img.src = image.src;
    img.alt = image.alt;
    let done = false;
    img.onload = img.onerror = () => {
        done = true;
    };
    return () => {
        if (done) return;
        img.src = img.srcset = "";
        seen.delete(image.srcset);
    };
}

export default Link;












// "use client";

// import NextLink from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { parseHTML } from 'linkedom';


// async function imgExtractor(href) {
//     const url = new URL(href, window.location.href);
//     const fullUrl = url.href

//     const response = await fetch(fullUrl);
//     if (!response.ok) {
//         return new Response("Failed to fetch", { status: response.status });
//     }
//     const body = await response.text();
//     const { document } = parseHTML(body);

//     const images = Array.from(document.querySelectorAll('img'))
//         .map((img) => ({
//             srcset: img.getAttribute("srcset") || img.getAttribute("srcSet"), // Linkedom is case-sensitive
//             sizes: img.getAttribute("sizes"),
//             src: img.getAttribute("src"),
//             alt: img.getAttribute("alt"),
//             loading: img.getAttribute("loading"),
//         }))
//         .filter((img) => img.src);
//     return images
// }

// async function prefetchImages(href) {
//     if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
//         return [];
//     }

//     const images = await imgExtractor(href)

//     return images;
// }

// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const prefetchedLinks = new Set(); // Tracks prefetched links globally
// const seen = new Set();

// export const Link = (({ children, ...props }) => {
//     const [images, setImages] = useState([]);
//     const [preloading, setPreloading] = useState([]);
//     const linkRef = useRef(null);
//     const router = useRouter();
//     let prefetchTimeout = null; // Track the timeout ID

//     useEffect(() => {
//         if (props.prefetch === false) {
//             return;
//         }

//         const linkElement = linkRef.current;
//         if (!linkElement) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const entry = entries[0];
//                 if (entry.isIntersecting && !prefetchedLinks.has(props.href)) {

//                     prefetchTimeout = setTimeout(async () => {
//                         prefetchedLinks.add(props.href); // Mark as prefetched
//                         router.prefetch(String(props.href));
//                         await sleep(0);
//                         void prefetchImages(String(props.href)).then((images) => {
//                             setImages(images);
//                             images.forEach(prefetchImage);
//                         }, console.error);
//                         observer.unobserve(entry.target);
//                     }, 300);

//                 } else if (prefetchTimeout) {
//                     clearTimeout(prefetchTimeout);
//                     prefetchTimeout = null;
//                 }
//             },
//             { rootMargin: "0px", threshold: 0.1 },
//         );

//         observer.observe(linkElement);

//         return () => {
//             observer.disconnect();
//             if (prefetchTimeout) {
//                 clearTimeout(prefetchTimeout);
//             }
//         };
//     }, [props.href, props.prefetch]);


//     return (
//         <>


//             <NextLink
//                 ref={linkRef}
//                 prefetch={false}
//                 onMouseDown={(e) => {
//                     const url = new URL(String(props.href), window.location.href);
//                     if (
//                         url.origin === window.location.origin &&
//                         e.button === 0 &&
//                         !e.altKey &&
//                         !e.ctrlKey &&
//                         !e.metaKey &&
//                         !e.shiftKey
//                     ) {
//                         e.preventDefault();
//                         router.push(String(props.href));
//                     }
//                 }}
//                 {...props}
//             >
//                 {children}
//             </NextLink>

//         </>

//     );
// });

// function prefetchImage(image) {
//     if (image.loading === "lazy" || seen.has(image.srcset)) {
//         return;
//     }
//     const img = new Image();
//     img.decoding = "async";
//     img.fetchPriority = "low";
//     img.sizes = image.sizes;
//     seen.add(image.srcset);
//     img.srcset = image.srcset;
//     img.src = image.src;
//     img.alt = image.alt;
//     let done = false;
//     img.onload = img.onerror = () => {
//         done = true;
//     };
//     return () => {
//         if (done) return;
//         img.src = img.srcset = "";
//         seen.delete(image.srcset);
//     };
// }

// export default Link;






















// "use client";

// import NextLink from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";

// async function imgExtractor(href) {
//     const url = new URL(href, window.location.href);
//     const response = await fetch(href);

//     if (!response.ok) {
//         console.error('Failed to fetch page');
//         return [];
//     }

//     const html = await response.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     const images = Array.from(doc.querySelectorAll('img'))
//         .map((img) => ({
//             srcset: img.getAttribute("srcset") || img.getAttribute("srcSet"),
//             sizes: img.getAttribute("sizes"),
//             src: img.getAttribute("src"),
//             alt: img.getAttribute("alt"),
//             loading: img.getAttribute("loading"),
//         }))
//         .filter((img) => img.src);
//     return images;
// }

// async function prefetchImages(href) {
//     if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
//         return [];
//     }

//     const images = await imgExtractor(href);
//     return images;
// }

// const seen = new Set();

// export const Link = (({ children, ...props }) => {
//     const [images, setImages] = useState([]);
//     const [prefetched, setPrefetched] = useState(false);
//     const linkRef = useRef(null);
//     const router = useRouter();

//     useEffect(() => {
//         if (props.prefetch === false || prefetched) {
//             return;
//         }

//         const linkElement = linkRef.current;
//         if (!linkElement) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const entry = entries[0];
//                 if (entry.isIntersecting && !prefetched) {
//                     router.prefetch(String(props.href));

//                     prefetchImages(String(props.href)).then((fetchedImages) => {
//                         setImages(fetchedImages);
//                         setPrefetched(true);

//                         fetchedImages.forEach(prefetchImage);
//                     }).catch(console.error);

//                     observer.unobserve(entry.target);
//                 }
//             },
//             { rootMargin: "200px", threshold: 0 }
//         );

//         observer.observe(linkElement);

//         return () => observer.disconnect();
//     }, [props.href, prefetched]);

//     return (
//         <NextLink
//             ref={linkRef}
//             prefetch={false}
//             onMouseDown={(e) => {
//                 const url = new URL(String(props.href), window.location.href);
//                 if (
//                     url.origin === window.location.origin &&
//                     e.button === 0 &&
//                     !e.altKey &&
//                     !e.ctrlKey &&
//                     !e.metaKey &&
//                     !e.shiftKey
//                 ) {
//                     e.preventDefault();
//                     router.push(String(props.href));
//                 }
//             }}
//             {...props}
//         >
//             {children}
//         </NextLink>
//     );
// });

// function prefetchImage(image) {
//     if (image.loading === "lazy" || seen.has(image.srcset)) {
//         return;
//     }
//     const img = new Image();
//     img.decoding = "async";
//     img.fetchPriority = "low";
//     img.sizes = image.sizes;
//     seen.add(image.srcset);
//     img.srcset = image.srcset;
//     img.src = image.src;
//     img.alt = image.alt;
//     let done = false;
//     img.onload = img.onerror = () => {
//         done = true;
//     };
//     return () => {
//         if (done) return;
//         img.src = img.srcset = "";
//         seen.delete(image.srcset);
//     };
// }

// export default Link;