const Large = ({ children, className = "", style = {} }) => {
    return (
        <div style={style} className={`text-lg font-semibold ${className}`}>
            {children}
        </div>
    );
};

export default Large;