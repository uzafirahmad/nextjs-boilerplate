const H4 = ({ children, className = "", style = {} }) => {
    return (
        <h4 style={style} className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
            {children}
        </h4>
    );
};

export default H4;
