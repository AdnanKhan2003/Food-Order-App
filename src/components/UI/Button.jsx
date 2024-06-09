export default function Button({
  children,
  textOnly,
  className = "",
  ...props
}) {
  const classes = `${className} ${textOnly ? "text-button" : "button"}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
