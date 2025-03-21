const Small = ({ children, className = "", style = {} }) => {
    return (
        <div style={style} className={`text-sm font-medium leading-none ${className}`}>
            {children}
        </div>
    );
};

export default Small;
