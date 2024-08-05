import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const InvoiceTable = ({ data }) => {
  if (!data || !data.meubles || !data.form_address) {
    return <Text>No data available</Text>; // Fallback UI
  }

  const renderMeublesRows = () => {
    return data.meubles.map((meuble) => (
      <View key={meuble.id} style={styles.row}>
        <Text style={styles.cell}>{meuble.title}</Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}>{meuble.quantity}</Text>
      </View>
    ));
  };

  const renderAddressRows = (addressType) => {
    const address = data.form_address[addressType];
    if (!address) return null;

    const rows = [];

    rows.push(
      <View key={addressType} style={styles.row}>
        <Text style={styles.cell}>{`Adresse de ${addressType}`}</Text>
        <Text style={styles.cell}>{`Adresse de ${addressType}`}</Text>
        <Text style={styles.cell}></Text>
      </View>
    );

    for (const [key, value] of Object.entries(address)) {
      rows.push(
        <View key={key} style={styles.row}>
          <Text style={styles.cell}>{key}</Text>
          <Text style={styles.cell}>{value}</Text>
          <Text style={styles.cell}></Text>
        </View>
      );
    }

    return rows;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Description</Text>
          <Text style={styles.headerCell}>Information</Text>
          <Text style={styles.headerCell}>Quantity</Text>
        </View>
        {renderMeublesRows()}
        {renderAddressRows("dep")}
        {renderAddressRows("arr")}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#4f46e5",
  },
  headerCell: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
  },
});

export default InvoiceTable;
