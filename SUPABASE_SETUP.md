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
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE
  TO authenticated
  USING (true);
```

## 2. Create Storage Bucket for Product Images

1. Go to Storage in your Supabase dashboard
2. Click "Create a new bucket"
3. Name it: `product-images`
4. Make it **public** (check the public bucket option)
5. Click "Create bucket"

## 3. Set Storage Policies

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

## 4. Update Environment Variables

Add to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The service role key can be found in Settings > API > service_role key (keep this secret!)

## 5. Test the Setup

1. Log in to the admin dashboard at `/admin`
2. Click "Add New Product"
3. Fill in the form and upload an image
4. The product should appear on the Products page

## Notes

- Images are stored in Supabase Storage
- Product data is stored in the products table
- Only authenticated users can add/delete products
- Public users can view products on the Products page
