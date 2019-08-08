import Link from "next/link"

const Navigation = () => (
  <>
    <h4>Navigation using a tag with query</h4>
    <nav>
      <a href="?name=now">now</a> | <a href="?name=next">next</a>
    </nav>

    <h4>Navigation using a tag with url</h4>
    <nav>
      <a href="now">now</a> | <a href="next">next</a>
    </nav>
  </>
)

export default Navigation
