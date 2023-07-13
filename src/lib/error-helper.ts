export const onError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}
