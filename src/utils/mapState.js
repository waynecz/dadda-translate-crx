export default function mapState(state) {
  let { vocabulary, currentLink, filter } = state
  return { vocabulary, currentLink, filter }
}
