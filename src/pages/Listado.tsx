import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import { Vehiculo } from "../Modelos/Vehiculo";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function Listado() {
  const [listavehiculos, setListaVehiculos] = useState<Vehiculo[]>([]);
  const [idVehiculo, setIdVehiculo] = useState(0);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const toast = useRef<Toast>(null);
  async function cargarVehiculos() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/vehiculo`);
      const data = await res.json();
      setListaVehiculos(data);
    } catch (error) {}
  }

  const openEditModal = (vehiculo: Vehiculo) => {
    setIdVehiculo(vehiculo.id);
    setMarca(vehiculo.marca);
    setModelo(vehiculo.modelo);
    setPlaca(vehiculo.placa);
    setModalVisible(true);
  };

  async function handleEdit(id: number) {
    let res;
    try {
      res = await fetch(`${process.env.REACT_APP_API_URL}/vehiculo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marca, modelo, placa }),
      });

      if (res.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Vehículo actualizado",
          life: 3000,
        });
        setModalVisible(false);
        cargarVehiculos();
      } else {
        const errorMessage = await res.json();
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: errorMessage.error,
          life: 3000,
        });
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Fallo en actualizar",
        detail: "No se logro actualizar el vehículo",
        life: 3000,
      });
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/vehiculo/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        cargarVehiculos();
        toast.current?.show({
          severity: "success",
          summary: "Vehículo eliminado",
          life: 3000,
        });
      } else {
        const errorMessage = await res.json();
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: errorMessage.error,
          life: 3000,
        });
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Fallo en eliminar",
        detail: "No se logro eliminar el vehículo",
        life: 3000,
      });
      console.error(error);
    }
  }

  const actionBodyTemplate = (rowData: Vehiculo) => {
    const confirmDelete = (id: number) => {
      confirmDialog({
        message: `¿Desea eliminar el vehículo ${rowData.marca} ${rowData.modelo}?`,
        header: "Confirmar eliminación",
        icon: "pi pi-exclamation-triangle",
        accept: () => handleDelete(rowData.id),
        reject: () => {},
      });
    };
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          onClick={() => openEditModal(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDelete(rowData.id)}
        />
      </div>
    );
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  return (
    <>
      <ConfirmDialog />
      <Dialog
        header="Editar Vehículo"
        visible={modalVisible}
        modal
        onHide={() => setModalVisible(false)}
      >
        <div className="flex flex-column gap-3">
          <label htmlFor="marca">Marca</label>
          <span className="p-float-label">
            <InputText
              id="marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </span>

          <label htmlFor="modelo">Modelo</label>

          <span className="p-float-label">
            <InputText
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </span>
          <label htmlFor="placa">Placa</label>

          <span className="p-float-label">
            <InputText
              id="placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </span>

          <Button
            label="Guardar"
            icon="pi pi-check"
            onClick={() => handleEdit(idVehiculo)}
            className="mt-3"
          />
        </div>
      </Dialog>
      <DataTable value={listavehiculos} stripedRows>
        <Column field="marca" header="Marca" sortable></Column>
        <Column field="modelo" header="Modelo" sortable></Column>
        <Column field="placa" header="Placa" sortable></Column>
        <Column header="Acciones" body={actionBodyTemplate}></Column>
      </DataTable>

      <Toast ref={toast} />
    </>
  );
}
