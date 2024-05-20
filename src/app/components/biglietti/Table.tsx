import { getBigliettiByDay } from "@/app/utils/ustilsDB";

export default async function InvoicesTable({ query }: { query: string }) {
  if (!query) return;
  const res = await getBigliettiByDay(new Date(query));
  console.log(res);
  if (!res) return;
  if (res.err) throw res.err;

  return (
    <div className="overflow-x-auto">
      <div className="divider"></div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>codice</th>
            <th>data di acquisto</th>
          </tr>
        </thead>
        <tbody>
          {res.results.map(
            (
              res: {
                id: number;
                tariffa: any;
                giorno_acquisto: any;
              },
              idx: number
            ) => (
              <tr key={res.id + idx + "biglietti"}>
                <th>{res.id}</th>
                <td>{new Date(res.giorno_acquisto).toLocaleDateString()}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
