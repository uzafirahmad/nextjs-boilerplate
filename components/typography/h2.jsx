const H2 = ({ children, className = "", style = {} }) => {
    return (
        <h2 style={style} className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
            {children}
        </h2>
    );
};

export default H2;
