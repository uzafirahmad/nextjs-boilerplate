const MutedSmall = ({ children, className = "", style = {} }) => {
    return (
        <p style={style} className={`text-xs text-muted-foreground ${className}`}>
            {children}
        </p>
    );
};

export default MutedSmall;
