// lib/supabaseFunctions.ts

import { supabase } from './supabaseClient'
import { Product } from '@/types/Product'

export const createProduct = async (product: Omit<Product, 'id'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    console.log(product.name)
    console.log(product.description)
    console.log(product.price)
    console.log(product.available)
  if (error) throw error
  return data[0]
}

export const updateProduct = async (product: Product) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      price: product.price,
      description: product.description,
      images: product.images,
      available: product.available
    })
    .eq('id', product.id)
    .select()
  if (error) throw error
  return data[0]
}

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}
