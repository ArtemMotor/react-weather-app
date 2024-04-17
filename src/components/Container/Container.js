export default function Container({ children, classes = 'Container' }) {
  return <div className={classes}>{children}</div>
}
