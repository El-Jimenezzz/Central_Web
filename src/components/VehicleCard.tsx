import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Vehicle, generateAltText } from "@/lib/vehicleValidation";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        {imageError ? (
          <div className="flex items-center justify-center h-80 bg-muted text-muted-foreground text-sm">
            Sin foto disponible
          </div>
        ) : (
          <img
            src={vehicle.foto}
            alt={generateAltText(vehicle)}
            className="w-full h-80 object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">
          {vehicle.marca} {vehicle.modelo}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Año: {vehicle.anio} · Combustible: {vehicle.tipoCombustible.charAt(0).toUpperCase() + vehicle.tipoCombustible.slice(1)}
        </p>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
