const Debug = props => (
  <pre>
    <code>{JSON.stringify(props, null, 2)}</code>
  </pre>
)

export default Debug