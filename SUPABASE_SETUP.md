# Supabase Database Setup for Products

## 1. Create Products Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  billing_frequency TEXT NOT NULL CHECK (billing_frequency IN ('yearly', 'monthly', 'one-off')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (IMPORTANT!)
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users only" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Enable delete for authenticated users only" ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Enable update for authenticated users only" ON products
  FOR UPDATE
  TO authenticated
  USING (true);
```

## If you already have the products table, add the billing_frequency column:

```sql
-- Add billing_frequency column to existing table
ALTER TABLE products
ADD COLUMN billing_frequency TEXT NOT NULL DEFAULT 'one-off'
CHECK (billing_frequency IN ('yearly', 'monthly', 'one-off'));
```

## 2. Verify RLS Policies

After running the SQL, verify the policies are created:

1. Go to your Supabase dashboard
2. Click on "Database" > "Tables" > "products"
3. Click on "Policies" tab
4. You should see 3 policies listed

If you don't see the policies, RLS might be blocking reads!

## 3. Create Storage Bucket for Product Images

1. Go to Storage in your Supabase dashboard
2. Click "Create a new bucket"
3. Name it: `product-images`
4. Make it **public** (check the public bucket option)
5. Click "Create bucket"

## 4. Set Storage Policies

Run this SQL to allow uploads:

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

-- Allow public read access to images
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');
```

## 5. Update Environment Variables

Add to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The service role key can be found in Settings > API > service_role key (keep this secret!)

## 6. Test the Setup

1. Log in to the admin dashboard at `/admin`
2. Click "Add New Product"
3. Fill in the form and upload an image
4. The product should appear on the Products page

## Troubleshooting

If products aren't showing:

1. **Check RLS policies**: Go to Database > Tables > products > Policies
2. **Test direct query**: In SQL Editor, run: `SELECT * FROM products;`
3. **Check browser console**: Look for errors in F12 Developer Tools
4. **Verify environment variables**: Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly

## Notes

- Images are stored in Supabase Storage
- Product data is stored in the products table
- Only authenticated users can add/delete products
- Public users can view products on the Products page
