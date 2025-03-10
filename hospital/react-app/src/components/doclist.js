
import { useEffect, useState } from "react";
import { getdoclist } from "../api/api";

const Doclist = () => {
  const [docRecords, setDocRecords] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await getdoclist(token);
        setDocRecords(data);
        console.log(data);
      } catch (error) {
        alert("Error fetching OPD records");
      }
    };
    fetchRecords();
  }, []); // Ensure it runs only once on component mount

  // Group records by hospitalId
  const groupByHospitalId = (records) => {
    return records.reduce((acc, record) => {
      const hospitalId = record.hospitalId;
      if (!acc[hospitalId]) {
        acc[hospitalId] = {
          hospital_name: record.hospital_name,
          doctors: [],
        };
      }
      acc[hospitalId].doctors.push({
        name: record.name,
        specialization: record.specialization,
        contact_info: record.contact_info,
        availability: record.availability,
      });
      return acc;
    }, {});
  };

  const groupedRecords = groupByHospitalId(docRecords);

  const handleHospitalClick = (hospitalId) => {
    setSelectedHospital(selectedHospital === hospitalId ? null : hospitalId);
  };

  return (
    <div className="w-[100%] h-[100%] ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {Object.keys(groupedRecords).length > 0 ? (
          Object.entries(groupedRecords).map(([hospitalId, hospitalData]) => (
            <div
              key={hospitalId}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 h-[20rem]"
              onClick={() => handleHospitalClick(hospitalId)}
            >
              <div className="font-bold text-lg">
                {hospitalData.hospital_name || "N/A"}
              </div>
              {selectedHospital === hospitalId && (
                <div className="mt-2">
                  <div className="text-sm text-gray-600">Doctors:</div>
                  {hospitalData.doctors.map((doctor, idx) => (
                    <div key={idx} className="mt-1 p-2 bg-gray-50 rounded">
                      <div>
                        <strong>Name:</strong> {doctor.name || "N/A"}
                      </div>
                      <div>
                        <strong>Specialization:</strong> {doctor.specialization || "N/A"}
                      </div>
                      <div>
                        <strong>Contact Info:</strong> {doctor.contact_info || "N/A"}
                      </div>
                      <div>
                        <strong>Availability:</strong>
                        {doctor.availability && typeof doctor.availability === "object"
                          ? Object.entries(doctor.availability).map(([day, time]) => (
                              <p key={day}>
                                {day}: {time}
                              </p>
                            ))
                          : doctor.availability || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center p-4">No records available.</div>
        )}
      </div>
    </div>
  );
};

export default Doclist;