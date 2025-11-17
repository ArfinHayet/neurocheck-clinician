// import { flexRender } from "@tanstack/react-table";


// const Table = ({ table }) => {
//   return (
//     <table className="table-auto  w-full">
//       <thead>
//         {table.getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id} className="border-b border-[#E0E0E0]">
//             {headerGroup.headers.map((header) => (
//               <th
//                 key={header.id}
//                 className="px-4 text-sm font-semibold text-[#3B3B3B] py-2 text-left"
//               >
//                 {flexRender(
//                   header.column.columnDef.header,
//                   header.getContext()
//                 )}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody className="divide-y">
//         {table.getRowModel().rows.map((row) => (
//           <tr key={row.id} className="hover:bg-gray-50 border-b border-[#E0E0E0]">
//             {row.getVisibleCells().map((cell) => (
//               <td
//                 key={cell.id}
//                 className="px-4 py-3 text-xs font-normal text-[#6C6C6C]"
//               >
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Table =() =>{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Table;