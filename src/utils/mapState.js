export default function mapState(state) {
  let { words, currentLink, filter } = state
  return { words, currentLink, filter }
}
