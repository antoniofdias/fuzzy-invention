import { DataResult } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import products from './products.json';

export const KendoGrid = () => {
  const gridData: DataResult = {
    data: products,
    total: products.length,
  };

  return (
    <Grid
      style={{ height: '400px' }}
      data={gridData.data}
      total={gridData.total}
    >
      <GridColumn field="ProductID" title="ID" width="40px" />
      <GridColumn field="ProductName" title="Name" width="250px" />
      <GridColumn field="Category.CategoryName" title="CategoryName" />
      <GridColumn field="UnitPrice" title="Price" />
      <GridColumn field="UnitsInStock" title="In stock" />
    </Grid>
  );
};
