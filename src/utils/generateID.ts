export default function generateID(): string {
  return(new Date().valueOf().toString());
}