export async function GET({ params } : { params: { id: string } }) {
  const { id } = await params;

  return id
}