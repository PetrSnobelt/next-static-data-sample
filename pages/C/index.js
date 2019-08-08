import dynamic from "next/dynamic"
import Link from "next/link"

import Debug from "../../components/debug"
import Counter from "../../components/counter"

function PageB(props) {
  return (
    <main>
      <Debug {...props} />
      <Counter initialValue={props.query.sameData} />
    </main>
  )
}

PageB.getInitialProps = async ({ query }) => {
  return { query }
}

export default PageB
