import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, TrendingUp, Bell, Bookmark } from "lucide-react";

interface PropertyValuationCheckProps {
  className?: string;
}

interface PropertyData {
  location: string;
  currentValue: number;
  pricePerSqm: number;
  sixMonthTrend: number;
  projectedAppreciation: number;
  lastUpdated: string;
  lastSoldPrice: number;
  lastSoldDate: string;
}

interface SavedLocation {
  id: string;
  name: string;
}

const PropertyValuationCheck: React.FC<PropertyValuationCheckProps> = ({
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [showSavedLocations, setShowSavedLocations] = useState(true); // Set to true by default

  // Example property data for showcase
  const exampleProperty: PropertyData = {
    location: "Berlin, Mitte",
    currentValue: 450000,
    pricePerSqm: 4800,
    sixMonthTrend: 3.2,
    projectedAppreciation: 2.5,
    lastUpdated: new Date().toLocaleDateString(),
    lastSoldPrice: 420000,
    lastSoldDate: "15.03.2023",
  };

  // Mock locations for Germany
  const germanLocations = [
    "Berlin",
    "Munich",
    "Hamburg",
    "Frankfurt",
    "Cologne",
    "Düsseldorf",
    "Stuttgart",
    "Dresden",
  ];

  // Filter locations based on search query
  const filteredLocations = germanLocations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Mock function to fetch property data
  const fetchPropertyData = async (location: string) => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock data based on location
      const mockData: PropertyData = {
        location,
        currentValue: Math.floor(300000 + Math.random() * 700000),
        pricePerSqm: Math.floor(2000 + Math.random() * 6000),
        sixMonthTrend: parseFloat((Math.random() * 8 - 2).toFixed(1)),
        projectedAppreciation: parseFloat((Math.random() * 6 - 1).toFixed(1)),
        lastUpdated: new Date().toLocaleDateString(),
        lastSoldPrice: Math.floor(280000 + Math.random() * 650000),
        lastSoldDate: new Date(
          Date.now() -
            Math.floor(Math.random() * 365 * 2 + 30) * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
      };

      setPropertyData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = () => {
    if (searchQuery) {
      setSelectedLocation(searchQuery);
      fetchPropertyData(searchQuery);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSearchQuery(location);
    setSelectedLocation(location);
    fetchPropertyData(location);
  };

  // Save current location
  const saveCurrentLocation = () => {
    if (propertyData) {
      const newSavedLocation: SavedLocation = {
        id: Date.now().toString(),
        name: propertyData.location,
      };

      setSavedLocations([...savedLocations, newSavedLocation]);
    }
  };

  return (
    <Card
      className={`bg-white shadow-md border border-gray-100 ${className} relative`}
    >
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center">
            <Home className="h-5 w-5 text-indigo-600 mr-2" />
            Property Valuation Check
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Search Box */}
          <div className="relative">
            <div className="flex">
              <Input
                placeholder="Search location in Germany..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                className="ml-2"
                onClick={handleSearch}
                disabled={isLoading}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Location Suggestions */}
            {searchQuery &&
              filteredLocations.length > 0 &&
              !selectedLocation && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      {location}
                    </div>
                  ))}
                </div>
              )}
          </div>
          {/* Location Information */}
          <div className="rounded-lg h-36 border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              {selectedLocation ? (
                <p className="text-gray-700 font-medium">
                  Showing data for: {selectedLocation}
                </p>
              ) : (
                <p className="text-gray-500">
                  Enter a location in Germany to see property valuation data
                </p>
              )}
            </div>
          </div>
          {/* Saved Locations */}
          {savedLocations.length > 0 && (
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center"
                onClick={() => setShowSavedLocations(!showSavedLocations)}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                {showSavedLocations ? "Hide" : "Show"} Saved Locations (
                {savedLocations.length})
              </Button>

              {showSavedLocations && (
                <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md">
                  {savedLocations.map((location) => (
                    <div
                      key={location.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        fetchPropertyData(location.name);
                        setSearchQuery(location.name);
                        setSelectedLocation(location.name);
                      }}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-indigo-600 mr-1" />
                        {location.name}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSavedLocations(
                            savedLocations.filter(
                              (loc) => loc.id !== location.id,
                            ),
                          );
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Property Data Display */}
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : propertyData ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg flex items-center">
                    <MapPin className="h-4 w-4 text-indigo-600 mr-1" />
                    {propertyData.location}
                    <span
                      className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"
                      title="Real-time data"
                    ></span>
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    Last updated: {propertyData.lastUpdated}
                    <span className="ml-2 text-xs text-green-600 flex items-center">
                      <span className="mr-1">Live</span>
                    </span>
                  </p>
                </div>
                <Badge
                  className={
                    propertyData.sixMonthTrend >= 0
                      ? "bg-green-600"
                      : "bg-red-600"
                  }
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {propertyData.sixMonthTrend >= 0 ? "+" : ""}
                  {propertyData.sixMonthTrend}% (6m)
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    Estimated Value
                    <span
                      className="ml-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"
                      title="Real-time data"
                    ></span>
                  </p>
                  <p className="text-xl font-bold flex items-center">
                    {propertyData.currentValue.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per m²</p>
                  <p className="text-xl font-bold">
                    {propertyData.pricePerSqm.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Sold Price</p>
                  <p className="text-xl font-bold">
                    {propertyData.lastSoldPrice.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Sold Date</p>
                  <p className="text-xl font-bold">
                    {propertyData.lastSoldDate}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  6-Month Price Trend
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${propertyData.sixMonthTrend >= 0 ? "bg-green-500" : "bg-red-500"}`}
                    style={{
                      width: `${Math.min(Math.abs(propertyData.sixMonthTrend) * 10, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1 font-semibold">
                  Projected Appreciation (Next 6 Months)
                </p>
                <div className="flex items-center">
                  <span
                    className={`text-lg font-semibold ${propertyData.projectedAppreciation >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {propertyData.projectedAppreciation >= 0 ? "+" : ""}
                    {propertyData.projectedAppreciation}%
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                  onClick={saveCurrentLocation}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Location
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Set Price Alert
                </Button>
              </div>
            </div>
          ) : selectedLocation ? (
            <div className="text-center py-4 text-gray-500">
              No data available for this location
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg flex items-center">
                    <Home className="h-4 w-4 text-indigo-600 mr-1" />
                    Example: {exampleProperty.location}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {exampleProperty.lastUpdated}
                  </p>
                </div>
                <Badge className="bg-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />+
                  {exampleProperty.sixMonthTrend}% (6m)
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Estimated Value</p>
                  <p className="text-xl font-bold">
                    {exampleProperty.currentValue.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per m²</p>
                  <p className="text-xl font-bold">
                    {exampleProperty.pricePerSqm.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Sold Price</p>
                  <p className="text-xl font-bold">
                    {exampleProperty.lastSoldPrice.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Sold Date</p>
                  <p className="text-xl font-bold">
                    {exampleProperty.lastSoldDate}
                  </p>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-700 italic">
                This is an example property valuation. Search for a location to
                see real data.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyValuationCheck;
