const Muted = ({ children, className = "", style = {} }) => {
    return (
        <p className={`text-sm text-muted-foreground ${className}`} style={style}>
            {children}
        </p>
    );
};

export default Muted;
