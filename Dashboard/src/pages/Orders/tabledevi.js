import React from 'react';

const InvoiceTable = ({ data }) => {

  console.log({data})
  const renderMeublesRows = () => {
    return data.devis_items.map((meuble) => (
      <tr key={meuble.id}>
        <td className="border p-4">{meuble.meuble_id.title}</td>
        <td className="border p-4"></td>
        <td className="border p-4">{meuble.quantite}</td>
      </tr>
    ));
  };

  const renderAddressRows = (addressObject) => {
    const address = addressObject

    console.log({address,obj : Object.entries(address)})
    const rows = [];

    delete address['id']
    rows.push(
      <tr key={address.type}>
        <td className="border p-4">{`Adresse de ${address.type}`}</td>
        <td className="border p-4">{`Adresse de ${address.type}`}</td>
        <td className="border p-4"></td>
      </tr>
    );

    for (const [key, value] of Object.entries(address)) {
      rows.push(
        <tr key={address.type}>
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
        {renderAddressRows(data.adr_dep)}
        {renderAddressRows(data.adr_arr)}
      </tbody>
    </table>
    </div>
  );
};



export default InvoiceTable;
