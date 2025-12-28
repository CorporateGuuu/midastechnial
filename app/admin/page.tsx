"use client";

import { Admin, Resource, ShowGuesser } from "react-admin";
import { useRecordContext } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import Image from "next/image";

const dataProvider = simpleRestProvider("/api/admin");

interface ProductRecord {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
  images?: string;
}

interface ProductData {
  title: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  category: string;
  inStock: boolean;
  images?: string[];
  newImage?: { rawFile: File };
}

export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider} title="Midas Admin">
      <Resource
        name="products"
        list={ProductList}
        edit={ProductEdit}
        show={ShowGuesser}
      />
      <Resource
        name="orders"
        list={OrderList}
        show={OrderShow}
      />
    </Admin>
  );
}

// Product List Component
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  FunctionField,
} from "react-admin";

function ProductList({ ...props }) {
  return (
    <List {...props}>
      <Datagrid>
        <FunctionField
          label="Image"
          render={(record: ProductRecord) => {
            const images = record.images ? JSON.parse(record.images) : [];
            return images.length > 0 ? (
              <Image src={images[0]} alt="Product" width={48} height={48} className="w-12 h-12 object-cover" />
            ) : null;
          }}
        />
        <TextField source="title" />
        <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
        <BooleanField source="inStock" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}

// Product Edit Component
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  ImageInput,
  ImageField as RAImageField,
} from "react-admin";

// useRecordContext imported at top for Product components

// Transform function to handle image uploads
const transform = async (data: ProductData) => {
  if (data.newImage?.rawFile) {
    const formData = new FormData();
    formData.append("file", data.newImage.rawFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      // Add to images array
      data.images = [...(data.images || []), url];
    }
    delete data.newImage;
  }
  return data;
};

function ProductEdit({ ...props }) {
  return (
    <Edit {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="title" fullWidth />
        <TextInput source="slug" fullWidth />
        <TextInput source="description" multiline fullWidth />
        <NumberInput source="price" />
        <NumberInput source="oldPrice" />
        <TextInput source="badge" />
        <TextInput source="category" />
        <BooleanInput source="inStock" />

        <ArrayInput source="images">
          <SimpleFormIterator>
            <TextInput source="url" label="Image URL" />
          </SimpleFormIterator>
        </ArrayInput>

        <CurrentImagesField />
        <ImageInput source="newImage" label="Upload New">
          <RAImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}

// Component to show current images
function CurrentImagesField() {
  const record = useRecordContext();
  if (!record) return null;

  const images = record.images ? JSON.parse(record.images) : [];

  if (images.length === 0) return null;

  return (
    <div>
      <label>Current Images:</label>
      <div className="flex gap-2.5 mt-2.5">
        {images.map((url: string, index: number) => (
          <Image key={index} src={url} alt="Current" width={96} height={96} className="w-24 h-24 object-cover" />
        ))}
      </div>
    </div>
  );
}

// Order List Component
import {
  DateField,
} from "react-admin";

function OrderList({ ...props }) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="user.email" label="Customer" />
        <NumberField source="total" />
        <TextField source="status" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  );
}

// Order Show Component
import {
  Show,
  SimpleShowLayout,
  UrlField,
} from "react-admin";
// TextField already imported above

function RefreshTrackingButton() {
  const record = useRecordContext();

  const handleRefreshTracking = async () => {
    if (!record?.trackingNumber) return;

    try {
      await fetch(`/api/shipping/refresh/${record.trackingNumber}`);
      // Refresh the show view to get updated data
      window.location.reload();
    } catch (error) {
      console.error('Failed to refresh tracking:', error);
      alert('Failed to refresh tracking information');
    }
  };

  return (
    <button
      className="px-4 py-2 bg-[#2196f3] text-white border-none rounded cursor-pointer text-sm"
      onClick={handleRefreshTracking}
    >
      Refresh Tracking
    </button>
  );
}

function OrderShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="trackingNumber" />
        <TextField source="carrier" />
        <TextField source="serviceLevel" />
        <UrlField source="trackingUrl" />
        <UrlField source="labelUrl" label="Shipping Label" />
        <RefreshTrackingButton />
      </SimpleShowLayout>
    </Show>
  );
}
