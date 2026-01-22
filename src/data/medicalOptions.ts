// Medical options based on doctor specialization

export const orthopedicOptions = {
  symptoms: [
    "Joint pain",
    "Back pain",
    "Knee pain",
    "Shoulder pain",
    "Hip pain",
    "Neck pain",
    "Swelling in joints",
    "Stiffness",
    "Muscle weakness",
    "Difficulty walking",
    "Fracture/Injury",
    "Sports injury",
    "Numbness/Tingling"
  ],
  diagnosis: [
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Lumbar spondylosis",
    "Cervical spondylosis",
    "Fracture",
    "Ligament tear",
    "Meniscus tear",
    "Tendinitis",
    "Bursitis",
    "Sciatica",
    "Disc herniation",
    "Frozen shoulder",
    "Carpal tunnel syndrome",
    "Osteoporosis"
  ],
  treatment: [
    "Rest and ice therapy",
    "Physical therapy",
    "Pain management",
    "Joint immobilization",
    "Surgical intervention required",
    "Steroid injection",
    "Exercise therapy",
    "Weight management",
    "Bracing/Splinting",
    "Hot/Cold compress"
  ],
  prescription: [
    "Tab. Paracetamol 500mg 1-0-1 x 5 days",
    "Tab. Ibuprofen 400mg 1-0-1 x 5 days",
    "Tab. Diclofenac 50mg 1-0-1 x 7 days",
    "Tab. Calcium + Vit D3 1-0-0 x 30 days",
    "Tab. Aceclofenac 100mg 1-0-1 x 5 days",
    "Cap. Omeprazole 20mg 1-0-0 x 7 days",
    "Tab. Methycobal 500mcg 1-0-1 x 15 days",
    "Gel Diclofenac apply locally BD",
    "Tab. Etoricoxib 60mg 0-0-1 x 5 days",
    "Tab. Pregabalin 75mg 0-0-1 x 7 days"
  ]
};

export const pediatricOptions = {
  symptoms: [
    "Fever",
    "Cough",
    "Cold/Runny nose",
    "Vomiting",
    "Diarrhea",
    "Stomach pain",
    "Ear pain",
    "Sore throat",
    "Rash",
    "Loss of appetite",
    "Difficulty breathing",
    "Crying excessively",
    "Not feeding well",
    "Weight loss"
  ],
  diagnosis: [
    "Viral fever",
    "Upper respiratory infection",
    "Acute gastroenteritis",
    "Acute otitis media",
    "Tonsillitis",
    "Bronchitis",
    "Pneumonia",
    "Allergic rhinitis",
    "Viral exanthem",
    "Hand foot mouth disease",
    "Chickenpox",
    "Measles",
    "Nutritional deficiency",
    "Growth monitoring"
  ],
  treatment: [
    "Symptomatic treatment",
    "Hydration therapy",
    "Antipyretics",
    "Antibiotics course",
    "Nebulization",
    "ORS and zinc supplementation",
    "Topical treatment",
    "Dietary modification",
    "Immunization",
    "Follow-up after 3 days"
  ],
  prescription: [
    "Syp. Paracetamol 5ml SOS for fever",
    "Syp. Cetirizine 2.5ml 0-0-1 x 5 days",
    "Syp. Amoxicillin 5ml 1-1-1 x 5 days",
    "Syp. Azithromycin 5ml 1-0-0 x 3 days",
    "Syp. Ondem 2ml SOS for vomiting",
    "ORS 1 packet in 1L water after each loose stool",
    "Syp. Zinc 5ml 1-0-0 x 14 days",
    "Syp. Calpol Plus 5ml SOS for fever",
    "Drops Nasivion 2 drops each nostril BD x 3 days",
    "Syp. Meftal-P 5ml SOS for pain/fever"
  ]
};

export const getMedicalOptions = (doctorId: string) => {
  return doctorId === '1' ? orthopedicOptions : pediatricOptions;
};
