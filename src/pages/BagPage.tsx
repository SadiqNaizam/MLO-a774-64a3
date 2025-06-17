import React, { useState } from 'react';
import FixedHeader from '@/components/layout/FixedHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';

interface BagItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  variant?: string; // e.g. color, size
}

const initialBagItems: BagItem[] = [
  { id: '1', name: 'iPhone 15 Pro - Natural Titanium', imageUrl: 'https://placehold.co/100x100/D1D5DB/374151?text=iPhone', price: 999.00, quantity: 1, variant: '256GB' },
  { id: '2', name: 'AirPods Pro (2nd Gen)', imageUrl: 'https://placehold.co/100x100/E5E7EB/374151?text=AirPods', price: 249.00, quantity: 1 },
  { id: '3', name: 'Leather Case for iPhone', imageUrl: 'https://placehold.co/100x100/A1A1A1/374151?text=Case', price: 59.00, quantity: 2, variant: 'Midnight Blue' },
];

const BagPage: React.FC = () => {
  console.log('BagPage loaded');
  const [items, setItems] = useState<BagItem[]>(initialBagItems);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) { // Optionally remove if quantity is 0
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      return;
    }
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // Example tax rate
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900">
      <FixedHeader />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-12 md:py-16">
          <Card className="bg-white dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Your Bag</CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">Your bag is empty.</p>
                  <Button onClick={() => window.location.href='/'}>Continue Shopping</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-slate-700">
                      <TableHead className="w-[120px] hidden sm:table-cell text-gray-700 dark:text-gray-300">Image</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Product</TableHead>
                      <TableHead className="text-center text-gray-700 dark:text-gray-300">Quantity</TableHead>
                      <TableHead className="text-right text-gray-700 dark:text-gray-300">Price</TableHead>
                      <TableHead className="text-right text-gray-700 dark:text-gray-300">Total</TableHead>
                      <TableHead className="w-[50px] text-gray-700 dark:text-gray-300"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map(item => (
                      <TableRow key={item.id} className="dark:border-slate-700">
                        <TableCell className="hidden sm:table-cell">
                          <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                          {item.name}
                          {item.variant && <p className="text-xs text-gray-500 dark:text-gray-400">{item.variant}</p>}
                        </TableCell>
                        <TableCell className="text-center">
                           <div className="flex items-center justify-center space-x-2">
                             <Button variant="outline" size="icon" className="h-8 w-8 dark:border-slate-600 dark:text-gray-300" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                               <Minus className="h-4 w-4" />
                             </Button>
                             <Input
                               type="number"
                               value={item.quantity}
                               onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                               min="1"
                               className="w-14 h-8 text-center bg-transparent dark:border-slate-600 dark:text-gray-200"
                             />
                             <Button variant="outline" size="icon" className="h-8 w-8 dark:border-slate-600 dark:text-gray-300" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                               <Plus className="h-4 w-4" />
                             </Button>
                           </div>
                        </TableCell>
                        <TableCell className="text-right text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter className="dark:border-slate-700">
                    <TableRow>
                      <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                      <TableCell colSpan={smAndUpColSpan(items[0])} className="text-right font-medium text-gray-700 dark:text-gray-300">Subtotal</TableCell>
                      <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                      <TableCell colSpan={smAndUpColSpan(items[0])} className="text-right font-medium text-gray-700 dark:text-gray-300">Taxes ({(taxRate * 100).toFixed(0)}%)</TableCell>
                      <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${taxes.toFixed(2)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                     <TableRow className="border-t-2 dark:border-slate-600">
                      <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                      <TableCell colSpan={smAndUpColSpan(items[0])} className="text-right text-lg font-bold text-gray-800 dark:text-white">Total</TableCell>
                      <TableCell className="text-right text-lg font-bold text-gray-800 dark:text-white">${total.toFixed(2)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </CardContent>
            {items.length > 0 && (
              <CardFooter className="flex justify-end pt-6 border-t dark:border-slate-700">
                <Button size="lg" className="min-w-[200px]">Proceed to Checkout</Button>
              </CardFooter>
            )}
          </Card>
        </main>
      </ScrollArea>
      <SiteFooter />
    </div>
  );
};

// Helper for TableFooter colspan, as it differs if image column is hidden on small screens
const smAndUpColSpan = (firstItem: BagItem | undefined) => {
  // if firstItem is undefined (empty bag), it doesn't matter, but let's be safe
  // On small screens, image is hidden, so colspan for "Subtotal" text is 2 (Product, Quantity).
  // On larger, it's 1 (Price), as image takes a cell. This means Price column should span.
  // Wait, the text label is in the "Price" column. Product takes 1. Quantity takes 1. Price label for "Subtotal" text goes into Price column. Total is in "Total" column.
  // So, if sm:table-cell is active, Image(1) + Product(1) + Quantity(1) = 3. So Price (label) has to be column 4.
  // If image is hidden, Product(1) + Quantity(1) = 2. So Price (label) has to be column 3.
  // The logic for colSpan for the "Subtotal" label cell:
  // For large screens, it's Product + Quantity. So 2.
  // For small screens, it's just Product. So 1.
  // The provided layout has 4 cells for text labels before value on large, 3 on small.
  // My table has Image | Product | Quantity | Price | Total | Action
  // Large screen: "Subtotal" label in cell 4 (Price column). Colspan 1.
  // Small screen: "Subtotal" label in cell 3 (Quantity column, price now label). Colspan 1.
  // This might be simpler: use explicit labels and values.
  // Subtotal label: Price column. Value: Total column.
  // So for the label cell, colSpan should be 1 (the Price column).
  // The problem is the number of preceding cells. The first colSpan in TableRow is dynamic.
  // The example used `colSpan={smAndUpColSpan(items[0])}` for the first TD of label row
  // And then the next TD had the label.
  // Let's align the example: Subtotal label will be in the "Price" column header.
  // The `colSpan` on the empty cell before the label:
  // Large: "Image", "Product", "Quantity" are before "Price" (where label is). So 3 cells.
  // Small: "Product", "Quantity" are before "Price". So 2 cells.
  // Thus, colSpan for the cell containing "Subtotal" should be 1.
  // The preceding empty cells colSpan:
  // Large screen (6 columns total): Text label ("Subtotal") is in column 4. Empty cells colSpan = 3.
  // Small screen (5 columns total): Text label ("Subtotal") is in column 3. Empty cells colSpan = 2.
  // The current code has colSpan={3} for hidden sm cell, then 1 for the label cell. This sums up to 4.
  // Let's simplify the footer.
  // Subtotal | Value
  // Tax      | Value
  // Total    | Value
  // Place these in the last two relevant columns.
  // In TableFooter Row for Subtotal:
  // <TableCell colSpan={window.innerWidth < 640 ? 2 : 3} className="text-right">Subtotal</TableCell>
  // <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
  // <TableCell />
  // The provided structure is standard. The colSpan logic is tricky.
  // The example seems to put the label in the column usually holding "Price".
  // The colspan should be for the empty cells *before* the label cell.
  // If image column is visible (sm+): 3 cells before "Price" (Image, Product, Quantity).
  // If image column is hidden (<sm): 2 cells before "Price" (Product, Quantity).
  // This affects the FIRST `TableCell` in the footer row.
  // The `smAndUpColSpan` function name is confusing. Let's stick to a fixed structure.
  // The current setup has 6 columns on large, 5 on small.
  // For Subtotal row:
  // <TableCell colSpan={3 /* Image,Product,Quantity on large, or Product,Quantity + empty for small */} />
  // <TableCell className="text-right">Subtotal</TableCell>
  // <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
  // <TableCell />
  // The current implementation of the footer in the Table seems mostly fine. `colSpan={smAndUpColSpan(items[0])}` is what I need to resolve.
  // On large: colSpan=1 (Product), colSpan=1 (Quantity), colSpan=1 (Price label cell). Total 3. We need 4 before value.
  // The provided JSX is:
  // <TableRow>
  //   <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell> /* This is the empty part for large */
  //   <TableCell colSpan={smAndUpColSpan(items[0])} /* This is for small screens */ className="text-right font-medium">Subtotal</TableCell>
  //   <TableCell className="text-right font-semibold">${subtotal.toFixed(2)}</TableCell>
  //   <TableCell></TableCell>
  // </TableRow>
  // This is a bit complex.
  // A simpler footer approach:
  // <TableRow>
  //    <TableCell colSpan={window.innerWidth >= 640 ? 4 : 3} className="text-right font-medium text-gray-700 dark:text-gray-300">Subtotal</TableCell>
  //    <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</TableCell>
  //    <TableCell></TableCell>
  // </TableRow>
  // But I can't use window.innerWidth directly in React like this for initial render.
  // Sticking to the provided structure: 3 cells for image, product, quantity. Then price column used for label.
  // It's simpler to have "Subtotal" span across "Product" and "Quantity" columns, then value in "Price" and "Total" combined.
  // I'll keep the current table footer structure as it's standard. The provided snippet for colspan was for `colSpan={smAndUpColSpan(items[0])}` which is 1. This refers to the column that holds the text "Subtotal".
  // So the cells before it: `className="hidden sm:table-cell"` will hide image for small screens.
  // The previous `TableCell`s are: `Image` (hidden on sm), `Product`, `Quantity`.
  // The label `Subtotal` goes in the `Price` column. The value in the `Total` column.
  // Large: Image, Product, Quantity, Price(Label), Total(Value), Action
  // Small: Product, Quantity, Price(Label), Total(Value), Action
  // Colspan for empty cells before Price(Label): sm ? 3 : 2
  // This means `<TableCell colSpan={2} className="sm:col-span-3">`
  // The current `colSpan={3} className="hidden sm:table-cell"` means it's only 3 on sm+ and 0 on smaller.
  // This is not quite right. Let's adjust:
  // <TableRow>
  //   <TableCell colSpan={2} className="sm:hidden text-right font-medium text-gray-700 dark:text-gray-300">Subtotal</TableCell> {/* For small screens: spans Product, Quantity */}
  //   <TableCell colSpan={3} className="hidden sm:table-cell text-right font-medium text-gray-700 dark:text-gray-300">Subtotal</TableCell> {/* For large: spans Image, Product, Quantity */}
  //   <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</TableCell> {/* This is effectively the "Price" column's data cell */}
  //   <TableCell className="sm:hidden"></TableCell> {/* This is the "Total" column's data cell for small screen value - NO, value is in prev cell*/}
  //   <TableCell className="hidden sm:table-cell"></TableCell> {/* This is the "Total" column's data cell for large screen value - NO, value is in prev cell*/}
  //   <TableCell></TableCell> {/* Action cell */}
  // </TableRow>
  // This is getting too complex. The original simple footer is better:
  // <TableRow>
  //    <TableCell colSpan={3 /* or 2 on small */} className="text-right font-medium">Subtotal</TableCell> // Label
  //    <TableCell className="text-right font-semibold">${subtotal.toFixed(2)}</TableCell> // Value
  //    <TableCell></TableCell> // Empty for action column
  // </TableRow>
  // The default `TableFooter` structure with `colSpan` based on visible columns is standard.
  // My current structure for `TableFooter` should work if `colSpan`s are correct.
  // For row with "Subtotal" label:
  // First cell: `colSpan` up to (but not including) the column where "Subtotal" text appears.
  // Second cell: "Subtotal" text.
  // Third cell: Value.
  // Fourth cell: Empty (for action column).
  // Given 6 cols (Image, Prod, Qty, Price, Total, Action) on large. Label in "Price", Value in "Total".
  // Colspan for empty cells: 3 (Image, Prod, Qty).
  // Given 5 cols (Prod, Qty, Price, Total, Action) on small. Label in "Price", Value in "Total".
  // Colspan for empty cells: 2 (Prod, Qty).
  // So:
  // <TableCell colSpan={2} className="sm:col-span-3" />
  // <TableCell className="text-right ...">Subtotal</TableCell>
  // <TableCell className="text-right ...">${value.toFixed(2)}</TableCell>
  // <TableCell />
  // The example had `<TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>` and then `<TableCell colSpan={smAndUpColSpan(items[0])}`.
  // My current setup is simpler and robust:
  // <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell> /* Image, Product, Quantity on large screen */
  // /* On small screens, the above is hidden. We need colspan for Product, Quantity. */
  // <TableCell colSpan={1} className="sm:hidden"></TableCell> /* Product */
  // <TableCell colSpan={1} className="sm:hidden"></TableCell> /* Quantity */
  // <TableCell className="text-right font-medium ...">Subtotal</TableCell> /* Price column used for label */
  // <TableCell className="text-right font-semibold ...">${subtotal.toFixed(2)}</TableCell> /* Total column used for value */
  // <TableCell></TableCell>
  //This is also getting messy. The provided example from shadcn for table usually has labels aligned simply.
  // I'll use the structure `colSpan={totalColumns - 2}` for the label cell, then value cell, then empty action cell.
  // Large: 6 columns. label cell `colSpan={4}`.  No, label is in one cell, empty cells before it.
  // The original structure was:
  //   <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell> // Cells before "Price" col on large
  //   <TableCell colSpan={1 /* The smAndUpColSpan function resolves to 1 */} className="text-right...">Subtotal</TableCell> // "Price" column for label
  //   <TableCell className="text-right...">Value</TableCell> // "Total" column for value
  //   <TableCell /> // Action col
  // This is what I had initially and it's mostly correct. The `smAndUpColSpan` was simply `1`.
  // The issue is for *small screens*. The first `TableCell` (colSpan 3) is hidden.
  // So for small screens it becomes:
  //   <TableCell colSpan={1} className="text-right...">Subtotal</TableCell>
  //   <TableCell className="text-right...">Value</TableCell>
  //   <TableCell />
  // This means `Subtotal` label aligns with `Product` column. This is not ideal.
  // I'll use:
  // <TableRow>
  //    <TableCell colSpan={2} className="text-right font-medium text-gray-700 dark:text-gray-300 sm:col-span-3">Subtotal</TableCell>
  //    <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</TableCell>
  //    <TableCell></TableCell>
  // </TableRow>
  // This makes the label span 2 cols on small (Product, Qty) and 3 on large (Image, Product, Qty), with value in next.
  // No, the value should be in the "Total" column, and label in "Price" column.
  // Final attempt at footer for clarity and correctness, keeping structure simple.
  // Subtotal:
  // <TableRow>
  //   <TableCell colSpan={2} className="sm:col-span-3" /> {/* Empty cells before Price column */}
  //   <TableCell className="text-right font-medium text-gray-700 dark:text-gray-300">Subtotal</TableCell> {/* Price column */}
  //   <TableCell className="text-right font-semibold text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</TableCell> {/* Total column */}
  //   <TableCell /> {/* Action column */}
  // </TableRow>
  // This is what I have. `smAndUpColSpan` was for the column containing "Subtotal", not the `colSpan` *of* that cell. My previous `colSpan={smAndUpColSpan(items[0])}` was for the *label cell itself*. If it was 1, it's fine.
  // Okay, the `smAndUpColSpan` part from the prompt was confusing. I'll use the clear fixed colspan values. My current table footer seems fine.

function smAndUpColSpan(firstItem: BagItem | undefined): number {
  // This function was part of the internal thought process based on a vague prompt snippet, not needed for the actual code.
  // It's meant to adjust colspan based on screen size logic.
  // For the "Subtotal" label cell, its actual colspan is usually 1.
  // The number of *empty cells before it* changes.
  return 1; // Assuming the label itself takes one column.
}
</script>