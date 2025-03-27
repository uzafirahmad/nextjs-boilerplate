const P = ({ children, className = "", style = {} }) => {
    return (
        <p className={`className="leading-7 [&:not(:first-child)]:mt-6" ${className}`} style={style}>
            {children}
        </p>
    );
};

export default P;
