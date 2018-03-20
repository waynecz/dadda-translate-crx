export default function mapState(state) {
  let { words, currentLink } = state
  return { words, currentLink }
}
