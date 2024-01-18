export function getUrlSearchParams(): string {
  return new URLSearchParams(window.location.search).toString()
}