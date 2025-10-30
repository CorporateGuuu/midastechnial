"use client";

import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("/api/admin");

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
        show={ShowGuesser}
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
  ImageField,
  FunctionField,
} from "react-admin";

function ProductList({ ...props }) {
  return (
    <List {...props}>
      <Datagrid>
        <FunctionField
          label="Image"
          render={(record: any) => {
            const images = record.images ? JSON.parse(record.images) : [];
            return images.length > 0 ? (
              <img src={images[0]} alt="Product" style={{ width: 50, height: 50 }} />
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
  useRecordContext,
} from "react-admin";

// Transform function to handle image uploads
const transform = async (data: any) => {
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
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {images.map((url: string, index: number) => (
          <img key={index} src={url} alt="Current" style={{ width: 100, height: 100, objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}

// Order List Component
import {
  ReferenceField,
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
