const H3 = ({ children, className = "", style = {} }) => {
    return (
        <h3 style={style} className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
            {children}
        </h3>
    );
};

export default H3;
