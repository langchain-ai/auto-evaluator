import { Table } from "@mantine/core";

const FilesTable = ({ files }: { files: any[] }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Size (MB)</th>
        </tr>
      </thead>
      <tbody>
        {files?.map((file, id) => (
          <tr key={id}>
            <td>{file?.name}</td>
            <td>{(file?.size / 1024 ** 2).toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default FilesTable;
