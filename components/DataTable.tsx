// components/DataTable.tsx
import { useState } from 'react';
import { Table, Form, Pagination, Button } from 'react-bootstrap';

type Data = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    pin: string;
};

const sampleData: Data[] = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    email: `email${index + 1}@example.com`,
    phone: `+123456789${index + 1}`,
    address: `Address ${index + 1}`,
    country: `Country ${index + 1}`,
    pin: `Pin ${index + 1}`,
}));

const DataTable = () => {
    const [data, setData] = useState<Data[]>(sampleData);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortField, setSortField] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'email', 'phone', 'address', 'country']);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 5;

    // Handle search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Filter data based on search query
    const filteredData = data.filter((row) => {
        return Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Handle sorting
    const handleSort = (field: string) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sortedData);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentPageData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Handle column selection
    const handleColumnSelection = (column: string) => {
        setSelectedColumns((prevSelected) =>
            prevSelected.includes(column)
                ? prevSelected.filter((col) => col !== column)
                : [...prevSelected, column]
        );
    };

    return (
        <div className="container my-5">
            <h3>Data Table</h3>

            {/* Search input */}
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Form.Group>

            {/* Column selection */}
            <div className="mb-3">
                <strong>Column Selection</strong>
                {['name', 'email', 'phone', 'address', 'country', 'pin'].map((column) => (
                    <Form.Check
                        key={column}
                        type="checkbox"
                        label={column.charAt(0).toUpperCase() + column.slice(1)}
                        checked={selectedColumns.includes(column)}
                        onChange={() => handleColumnSelection(column)}
                    />
                ))}
            </div>

            {/* Data Table */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {selectedColumns.includes('id') && <th onClick={() => handleSort('id')}>ID</th>}
                        {selectedColumns.includes('name') && <th onClick={() => handleSort('name')}>Name</th>}
                        {selectedColumns.includes('email') && <th onClick={() => handleSort('email')}>Email</th>}
                        {selectedColumns.includes('phone') && <th onClick={() => handleSort('phone')}>Phone</th>}
                        {selectedColumns.includes('address') && <th onClick={() => handleSort('address')}>Address</th>}
                        {selectedColumns.includes('country') && <th onClick={() => handleSort('country')}>Country</th>}
                        {selectedColumns.includes('pin') && <th onClick={() => handleSort('pin')}>Pin</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((row) => (
                        <tr key={row.id}>
                            {selectedColumns.includes('id') && <td>{row.id}</td>}
                            {selectedColumns.includes('name') && <td>{row.name}</td>}
                            {selectedColumns.includes('email') && <td>{row.email}</td>}
                            {selectedColumns.includes('phone') && <td>{row.phone}</td>}
                            {selectedColumns.includes('address') && <td>{row.address}</td>}
                            {selectedColumns.includes('country') && <td>{row.country}</td>}
                            {selectedColumns.includes('pin') && <td>{row.pin}</td>}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination>
                <Pagination.Prev
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default DataTable;
