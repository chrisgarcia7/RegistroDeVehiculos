import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { Vehiculo } from "../Modelos/Vehiculo";
import { Entrada } from "../Modelos/Entrada";
import { Salida } from "../Modelos/Salida";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Divider } from "primereact/divider";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  placa: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  motorista: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  fecha_entrada: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
};

export default function Registro() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  const [vehiculoEntrada, setVehiculoEntrada] = useState<Vehiculo | null>();
  const [motoristaEntrada, setMotoristaEntrada] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState<Date | null>(new Date());
  const [horaEntrada, setHoraEntrada] = useState(
    new Date().toLocaleTimeString(),
  );
  const [kilometrajeE, setKilometrajeE] = useState<number | null>(0);
  const [listaEntradas, setListaEntradas] = useState<Entrada[]>([]);
  const [placas, setPlacas] = useState([]);

  const [vehiculoSalida, setVehiculoSalida] = useState();
  const [motoristaSalida, setMotoristaSalida] = useState("");
  const [fechaSalida, setFechaSalida] = useState<Date>();
  const [horaSalida, setHoraSalida] = useState("");
  const [kmSalida, setKmSalida] = useState<number | null>();
  const [listaSalidas, setListaSalidas] = useState<Salida[]>([]);

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  useEffect(() => {
    cargarVehiculos();
    cargarEntradas();
  }, []);

  const formatDate = (value: Date) => {
    return value.toLocaleDateString("es-HN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateBodyTemplate = (rowData: Entrada) => {
    return formatDate(rowData.fecha_entrada);
  };

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="dd/mm/yy"
        placeholder="dd/mm/yy"
        mask="99/99/9999"
      />
    );
  };

  const placaBodyTemplate = (rowData: Entrada) => {
    const placa = rowData.placa_vehiculo;

    return (
      <div className="flex align-items-center gap-2">
        <span>{placa}</span>
      </div>
    );
  };

  const placaItemTemplate = (option: Entrada) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.placa_vehiculo}</span>
      </div>
    );
  };

  const placaFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={vehiculos}
        itemTemplate={placaItemTemplate}
        onChange={(e: MultiSelectChangeEvent) =>
          options.filterCallback(e.value)
        }
        optionLabel="placa"
        placeholder="Filtrar por placa"
        className="p-column-filter"
      />
    );
  };

  const cargarVehiculos = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/vehiculo`);
    const data = await res.json();
    setVehiculos(data);
  };

  const cargarEntradas = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/entrada`);
    const data = await res.json();
    const placas1 = data.map((item: any) => item.placa_vehiculo);

    setPlacas(placas1);

    const entradasFormateadas = data.map((item: any) => ({
      ...item,
      fecha_entrada: new Date(item.fecha_entrada),
    }));

    setListaEntradas(entradasFormateadas);
  };

  const handleSubmitEntrada = async (e: any) => {
    e.preventDefault();
    try {
      let res;
      let vehiculo_id = vehiculoEntrada?.id;
      let placa_vehiculo = vehiculoEntrada?.placa;
      let motorista = motoristaEntrada;
      let fecha_entrada = fechaEntrada;
      let hora_entrada = horaEntrada;
      let kilometraje = kilometrajeE;

      res = await fetch(`${process.env.REACT_APP_API_URL}/entrada`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehiculo_id,
          placa_vehiculo,
          motorista,
          fecha_entrada,
          hora_entrada,
          kilometraje,
        }),
      });
      console.log(res);

      if (res.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Registrado Correctamente",
          detail: "La entrada ha sido registrado correctamente",
          life: 3000,
        });
        cargarEntradas();
        setVehiculoEntrada(null);
        setMotoristaEntrada("");
        setFechaEntrada(new Date());
        setHoraEntrada(new Date().toLocaleTimeString());
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al registrar su entrada",
          life: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toast = useRef<Toast>(null);
  return (
    <>
      <Toast ref={toast} />
      <div className="grid p-7 flex flex-column" style={{ height: "600px" }}>
        <div className="col-12 md:col-4">
          <Card title="Registrar Entrada">
            <div className="flex flex-column gap-3">
              <Dropdown
                value={vehiculoEntrada}
                options={vehiculos}
                optionLabel="placa"
                placeholder="Seleccione vehículo"
                onChange={(e) => setVehiculoEntrada(e.target.value)}
              />

              <InputText
                placeholder="Nombre del motorista"
                value={motoristaEntrada}
                onChange={(e) => setMotoristaEntrada(e.target.value)}
              />

              <Calendar
                value={fechaEntrada}
                onChange={(e) => setFechaEntrada(e.value ?? null)}
                placeholder="Fecha"
                showIcon
                dateFormat="dd/mm/yy"
                mask="99/99/9999"
              />

              <InputText
                placeholder="Hora"
                value={horaEntrada}
                onChange={(e) => setHoraEntrada(e.target.value)}
              />

              <InputNumber
                value={kilometrajeE}
                onChange={(e) => setKilometrajeE(e.value)}
                placeholder="Kilometraje"
              />

              <Button
                label="Registrar Entrada"
                icon="pi pi-check"
                onClick={handleSubmitEntrada}
                disabled={
                  !vehiculoEntrada ||
                  !motoristaEntrada ||
                  !fechaEntrada ||
                  !horaEntrada ||
                  !kilometrajeE
                    ? true
                    : false
                }
              />
            </div>
          </Card>
        </div>
        <div className="col-12 md:col-8">
          <Card title="Listado de Entradas">
            <DataTable
              value={listaEntradas}
              scrollable
              scrollHeight="flex"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column field="vehiculo_id" header="Registro" />
              <Column
                field="placa_vehiculo"
                header="Placa"
                filterField="placa"
                showFilterMatchModes={false}
                body={placaBodyTemplate}
                filter
                filterElement={placaFilterTemplate}
              />
              <Column
                field="motorista"
                header="Motorista"
                filter
                filterPlaceholder="Buscar por nombre"
              />
              <Column
                field="fecha_entrada"
                header="Fecha"
                filterField="fecha_entrada"
                dataType="date"
                style={{ minWidth: "10rem" }}
                body={dateBodyTemplate}
                filter
                filterElement={dateFilterTemplate}
              />
              <Column field="hora_entrada" header="Hora" />
              <Column field="kilometraje" header="Kilometraje" />
            </DataTable>
          </Card>
        </div>
      </div>
      <Divider />
      <div className="grid p-7 flex flex-column" style={{ height: "600px" }}>
        <div className="col-12 md:col-4">
          <Card title="Registrar Salida">
            <div className="flex flex-column gap-3">
              <Dropdown
                value={vehiculoSalida}
                options={vehiculos}
                optionLabel="placa"
                placeholder="Seleccione vehículo"
                onChange={(e) => setVehiculoSalida(e.value)}
              />

              <InputText
                placeholder="Nombre del motorista"
                value={motoristaSalida}
                onChange={(e) => setMotoristaSalida(e.target.value)}
              />

              <Calendar
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.value as Date)}
                placeholder="Fecha"
                showIcon
              />

              <InputText
                placeholder="Hora"
                value={horaSalida}
                onChange={(e) => setHoraSalida(e.target.value)}
              />

              <InputNumber
                value={kmSalida}
                onValueChange={(e) => setKmSalida(e.value ?? null)}
                placeholder="Kilometraje"
              />

              <Button
                label="Registrar Salida"
                icon="pi pi-sign-out"
                severity="danger"
                // onClick={registrarSalida}
              />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-8">
          <Card title="Listado de Salidas">
            <DataTable
              value={listaSalidas}
              scrollable
              scrollHeight="flex"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column field="vehiculo" header="Vehículo" />
              <Column field="motorista" header="Motorista" />
              <Column field="fecha" header="Fecha" />
              <Column field="hora" header="Hora" />
              <Column field="kilometraje" header="Kilometraje" />
            </DataTable>
          </Card>
        </div>
      </div>
    </>
  );
}
