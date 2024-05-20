import { getAllCategories, getAllEsposizioni } from "../utils/ustilsDB";
import RecordComponent from "./Record";
export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await getAllEsposizioni();
  if (res.err) throw res.err;
  const cate = await getAllCategories();
  if (cate.err) throw cate.err;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>titolo esposizione</th>
            <th>tariffa</th>
            <th>ricavato totale</th>
            <th>biglietti venduti</th>
            {cate.results.map(
              (cat: { sconto: number; descrizione: string }) => (
                <th>
                  {cat.descrizione} sontato del {cat.sconto}%
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {res.results.map(
            (
              esposizione: {
                tariffa: number;
                titolo: string;
                codice: number;
              },
              idx: number
            ) => (
              <RecordComponent
                key={esposizione.codice + "esposizione"}
                idEs={esposizione.codice}
                idx={idx + 1}
                titoloEsposizione={esposizione.titolo}
                categorie={cate.results}
                tariffa={esposizione.tariffa}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
