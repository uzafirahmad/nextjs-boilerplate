const H1 = ({ children, className = "", style = {} }) => {
    return (
        <h1 style={style} className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" ${className}`}>
            {children}
        </h1>
    );
};

export default H1;
