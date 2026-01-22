
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Patient, Visit, Doctor } from '../types/hospital';
import { loadPatients, savePatients, addVisitToPatient, getCurrentDate, generateReceipt, loadDoctors } from '../utils/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Prescription from './Prescription';
import { getMedicalOptions } from '../data/medicalOptions';

const PatientDetail = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVisit, setActiveVisit] = useState<Visit | null>(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [prescriptionVisit, setPrescriptionVisit] = useState<Visit | null>(null);
  
  const [newVisit, setNewVisit] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    fees: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  useEffect(() => {
    if (!patientId) return;
    
    const patients = loadPatients();
    const foundPatient = patients.find(p => p.id === patientId);
    
    if (foundPatient) {
      setPatient(foundPatient);
      
      // Load the doctor info
      const doctors = loadDoctors();
      const foundDoctor = doctors.find(d => d.id === foundPatient.doctorId);
      if (foundDoctor) {
        setDoctor(foundDoctor);
      }
    } else {
      toast.error('Patient not found');
      navigate('/registration');
    }
    
    setLoading(false);
  }, [patientId, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVisit(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddVisit = () => {
    if (!patient) return;
    
    if (!newVisit.symptoms || !newVisit.diagnosis || !newVisit.fees) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const visitData = {
      date: getCurrentDate(),
      symptoms: newVisit.symptoms,
      diagnosis: newVisit.diagnosis,
      treatment: newVisit.treatment,
      prescription: newVisit.prescription,
      fees: parseFloat(newVisit.fees),
      paid: false,
      receiptGenerated: false
    };
    
    const updatedPatient = addVisitToPatient(patient.id, visitData);
    
    if (updatedPatient) {
      setPatient(updatedPatient);
      setNewVisit({
        symptoms: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
        fees: ''
      });
      toast.success('Visit added successfully');
    } else {
      toast.error('Failed to add visit');
    }
  };
  
  const handleGenerateReceipt = (visit: Visit) => {
    if (!patient) return;
    
    const receipt = generateReceipt(
      patient.id,
      visit.id,
      patient.doctorId,
      visit.fees,
      paymentMethod
    );
    
    // Update the patient information to reflect paid status
    const patients = loadPatients();
    const updatedPatient = patients.find(p => p.id === patient.id);
    if (updatedPatient) {
      setPatient(updatedPatient);
    }
    
    toast.success('Receipt generated successfully');
    navigate(`/receipt/${receipt.id}`);
  };
  
  const sortedVisits = patient?.visitHistory.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (loading) {
    return <div className="text-center py-8">Loading patient data...</div>;
  }

  if (!patient) {
    return <div className="text-center py-8">Patient not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hospital-primary">Patient Details</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="border-hospital-primary text-hospital-primary"
        >
          Back
        </Button>
      </div>
      
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle>{patient.name}</CardTitle>
          <CardDescription>
            {patient.age} years • {patient.gender === 'male' ? 'Male' : patient.gender === 'female' ? 'Female' : 'Other'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500">Phone Number</Label>
              <p>{patient.phoneNumber}</p>
            </div>
            <div>
              <Label className="text-gray-500">Address</Label>
              <p>{patient.address}</p>
            </div>
            <div>
              <Label className="text-gray-500">Doctor</Label>
              <p>
                {patient.doctorId === '1' 
                  ? 'Dr. Shakil Shikalgar (Orthopedics)' 
                  : 'Dr. Ruksana Shikalgar (Pediatrics)'}
              </p>
            </div>
            <div>
              <Label className="text-gray-500">Total Visits</Label>
              <p>{patient.visitHistory.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Visit */}
        <Card className="shadow-md h-fit">
          <CardHeader>
            <CardTitle className="text-xl text-hospital-primary">Add New Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Symptoms Dropdown */}
              <div>
                <Label htmlFor="symptoms">Symptoms*</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    setNewVisit(prev => ({
                      ...prev,
                      symptoms: prev.symptoms ? `${prev.symptoms}, ${value}` : value
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select common symptoms" />
                  </SelectTrigger>
                  <SelectContent>
                    {patient && getMedicalOptions(patient.doctorId).symptoms.map((symptom) => (
                      <SelectItem key={symptom} value={symptom}>
                        {symptom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  value={newVisit.symptoms}
                  onChange={handleInputChange}
                  placeholder="Selected symptoms (or type custom)"
                  className="mt-2"
                  rows={2}
                />
              </div>
              
              {/* Diagnosis Dropdown */}
              <div>
                <Label htmlFor="diagnosis">Diagnosis*</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    setNewVisit(prev => ({
                      ...prev,
                      diagnosis: prev.diagnosis ? `${prev.diagnosis}, ${value}` : value
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select common diagnosis" />
                  </SelectTrigger>
                  <SelectContent>
                    {patient && getMedicalOptions(patient.doctorId).diagnosis.map((diag) => (
                      <SelectItem key={diag} value={diag}>
                        {diag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  id="diagnosis"
                  name="diagnosis"
                  value={newVisit.diagnosis}
                  onChange={handleInputChange}
                  placeholder="Selected diagnosis (or type custom)"
                  className="mt-2"
                  rows={2}
                />
              </div>
              
              {/* Treatment Dropdown */}
              <div>
                <Label htmlFor="treatment">Treatment Plan</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    setNewVisit(prev => ({
                      ...prev,
                      treatment: prev.treatment ? `${prev.treatment}, ${value}` : value
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select treatment plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {patient && getMedicalOptions(patient.doctorId).treatment.map((treat) => (
                      <SelectItem key={treat} value={treat}>
                        {treat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  id="treatment"
                  name="treatment"
                  value={newVisit.treatment}
                  onChange={handleInputChange}
                  placeholder="Selected treatment (or type custom)"
                  className="mt-2"
                  rows={2}
                />
              </div>
              
              {/* Prescription Dropdown */}
              <div>
                <Label htmlFor="prescription">Prescription</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    setNewVisit(prev => ({
                      ...prev,
                      prescription: prev.prescription ? `${prev.prescription}\n${value}` : value
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select medications" />
                  </SelectTrigger>
                  <SelectContent>
                    {patient && getMedicalOptions(patient.doctorId).prescription.map((med) => (
                      <SelectItem key={med} value={med}>
                        {med}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  id="prescription"
                  name="prescription"
                  value={newVisit.prescription}
                  onChange={handleInputChange}
                  placeholder="Selected medications (or type custom)"
                  className="mt-2"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="fees">Consultation Fees (₹)*</Label>
                <Input
                  id="fees"
                  name="fees"
                  type="number"
                  value={newVisit.fees}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handleAddVisit}
                className="w-full mt-2 bg-hospital-primary hover:bg-hospital-dark"
              >
                Save Visit
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Visit History */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-hospital-primary">Visit History</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedVisits && sortedVisits.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedVisits.map(visit => (
                      <TableRow key={visit.id}>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell className="max-w-[150px] truncate" title={visit.diagnosis}>
                          {visit.diagnosis}
                        </TableCell>
                        <TableCell>₹{visit.fees}</TableCell>
                        <TableCell>
                          {visit.paid ? (
                            <span className="text-green-600 font-medium">Paid</span>
                          ) : (
                            <span className="text-red-600 font-medium">Unpaid</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setActiveVisit(visit)}
                                >
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Visit Details - {visit.date}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <Label className="text-gray-500">Symptoms</Label>
                                    <p className="mt-1">{visit.symptoms}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-500">Diagnosis</Label>
                                    <p className="mt-1">{visit.diagnosis}</p>
                                  </div>
                                  {visit.treatment && (
                                    <div>
                                      <Label className="text-gray-500">Treatment</Label>
                                      <p className="mt-1">{visit.treatment}</p>
                                    </div>
                                  )}
                                  {visit.prescription && (
                                    <div>
                                      <Label className="text-gray-500">Prescription</Label>
                                      <p className="mt-1">{visit.prescription}</p>
                                    </div>
                                  )}
                                  <div>
                                    <Label className="text-gray-500">Fees</Label>
                                    <p className="mt-1">₹{visit.fees}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {!visit.paid && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm"
                                    className="bg-hospital-secondary hover:bg-hospital-secondary/90"
                                    onClick={() => setActiveVisit(visit)}
                                  >
                                    Generate Receipt
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Generate Receipt</DialogTitle>
                                  </DialogHeader>
                                  <div className="mt-4">
                                    <Label htmlFor="paymentMethod">Payment Method</Label>
                                    <Select
                                      value={paymentMethod}
                                      onValueChange={setPaymentMethod}
                                    >
                                      <SelectTrigger id="paymentMethod" className="mt-1">
                                        <SelectValue placeholder="Select payment method" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="upi">UPI</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    
                                    <div className="mt-4">
                                      <Label>Amount</Label>
                                      <p className="mt-1 font-medium">₹{visit.fees}</p>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      className="bg-hospital-primary hover:bg-hospital-dark" 
                                      onClick={() => {
                                        if (activeVisit) {
                                          handleGenerateReceipt(activeVisit);
                                        }
                                      }}
                                    >
                                      Complete Payment & Generate Receipt
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                            
                            {/* Print Prescription Button */}
                            <Button 
                              size="sm"
                              variant="outline"
                              className="border-hospital-accent text-hospital-accent"
                              onClick={() => {
                                setPrescriptionVisit(visit);
                                setShowPrescription(true);
                              }}
                            >
                              Prescription
                            </Button>
                            
                            {visit.receiptGenerated && (
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const receipt = localStorage.getItem('receipts');
                                  if (receipt) {
                                    const receipts = JSON.parse(receipt);
                                    const foundReceipt = receipts.find((r: any) => r.visitId === visit.id);
                                    if (foundReceipt) {
                                      navigate(`/receipt/${foundReceipt.id}`);
                                    }
                                  }
                                }}
                              >
                                View Receipt
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No visit history available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Prescription Dialog */}
      <Dialog open={showPrescription} onOpenChange={setShowPrescription}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Prescription</DialogTitle>
          </DialogHeader>
          {prescriptionVisit && patient && doctor && (
            <Prescription 
              patient={patient}
              visit={prescriptionVisit}
              doctor={doctor}
              onClose={() => setShowPrescription(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDetail;
