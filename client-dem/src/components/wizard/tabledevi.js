import React from 'react';

const InvoiceTable = ({ data }) => {
  const renderMeublesRows = () => {
    return data.meubles.map((meuble) => (
      <tr key={meuble.id}>
        <td className="border p-4">{meuble.title}</td>
        <td className="border p-4"></td>
        <td className="border p-4">{meuble.quantity}</td>
      </tr>
    ));
  };

  const renderAddressRows = (addressType) => {
    const address = data.form_address[addressType];
    const rows = [];

    rows.push(
      <tr key={addressType}>
        <td className="border p-4">{`Adresse de ${address.type}`}</td>
        <td className="border p-4">{`Adresse de ${address.type}`}</td>
        <td className="border p-4"></td>
      </tr>
    );

    for (const [key, value] of Object.entries(address)) {
      rows.push(
        <tr key={key}>
          <td className="border p-4">{key}</td>
          <td className="border p-4">{value}</td>
          <td className="border p-4"></td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className='p-4'>
    <table className="w-full border-collapse border border-gray-300 shadow-lg">
      <thead>
        <tr>
          <th className="border border-gray-300 p-4 font-bold bg-indigo-600 text-white">
            Description
          </th>
          <th className="border border-gray-300 p-4 font-bold bg-indigo-600 text-white">
            Information
          </th>
          <th className="border border-gray-300 p-4 font-bold bg-indigo-600 text-white">
            Quantity
          </th>
        </tr>
      </thead>
      <tbody>
        {renderMeublesRows()}
        {renderAddressRows('dep')}
        {renderAddressRows('arr')}
      </tbody>
    </table>
    </div>
  );
};



export default InvoiceTable;
