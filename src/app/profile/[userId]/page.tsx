export default async function UserDetails({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div>
      <h1>User Details</h1>
      <h2>{userId}</h2>
    </div>
  );
}
