export default function generateID(): string {
  return(Math.random().toString().substr(2, 14));
}