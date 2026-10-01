/**
 * Google reviews from Amaltas patients and families, transcribed word for word
 * from the "Happy Patient Review" cards published on
 * amaltashospital.in/patient-review. `image` is that original card.
 * `about` is a short English label for what the review describes.
 */
export interface PatientReview {
  name: string;
  text: string;
  /** Script of the review text: Hindi (Devanagari) or romanised Hindi. */
  lang: 'hi' | 'hi-Latn';
  about: string;
  image: string;
}

const card = (n: string) => `/images/reviews/${n}.jpeg`;

export const patientReviews: PatientReview[] = [
  { name: 'Tina Parmar', lang: 'hi-Latn', about: "Father's eye treatment · Ayushman Card", image: card('07'), text: 'Mere papa ko aankhon se dikhne mein bahut dikkat thi. Unhone bahut jagah dikhaya, par kahin se bhi koi fark nahi pada. Phir hum unhe Amaltas Hospital le kar aaye. Yahan unka aankhon ka ilaj Ayushman Card ke zariye hua, aur ek bhi paisa nahi laga. Ab mere papa ko achhe se dikhai deta hai, vo bilkul theek hain. Thank you so much Amaltas Hospital!' },
  { name: 'Karan Singh Rajput', lang: 'hi-Latn', about: "Grandfather's operation", image: card('05'), text: 'Bahut hi accha hospital hai. Mere dadaji ka operation bahut achha hua. Main khush hoon, kyunki bade-bade hospitals ne mana kar diya tha. Yahan ke doctors sab bahut acche hain. Thank you!' },
  { name: 'Mukesh Ahirwal', lang: 'hi', about: 'Nose surgery · Ayushman Yojana', image: card('10'), text: 'मेरा इलाज आयुष्मान योजना से हुआ। मैं टीकमगढ़ से हूँ और मैंने अमलतास अस्पताल देवास, में नाक का ऑपरेशन कराया। यहाँ के सभी डॉक्टर बहुत अच्छे से देखते हैं। धन्यवाद अमलतास अस्पताल!' },
  { name: 'Rupesh Malviya', lang: 'hi-Latn', about: 'Major surgery at 61', image: card('12'), text: 'Bada operation karwaya 61 saal ki umar mein Amaltas Hospital Dewas mein. Operation bahut achhe se hua aur bahut kam paison mein ho gaya. Dhanyawad Amaltas Hospital Dewas!' },
  { name: 'Raj Rajput', lang: 'hi', about: 'Normal delivery', image: card('13'), text: 'अमलतास अस्पताल, देवास में नॉर्मल डिलीवरी बहुत अच्छे तरीके से की जाती है। यहाँ की सभी सुविधाएँ उत्कृष्ट हैं, साफ-सफाई का विशेष ध्यान रखा जाता है, और स्टाफ भी बहुत सहयोगी है। धन्यवाद अमलतास अस्पताल!' },
  { name: 'Sapna Bamniya', lang: 'hi-Latn', about: "Mother's operation · Ayushman Card", image: card('08'), text: 'Amaltas hospital bahut aacha hospital hai h yaha meri mummy ka operation hua tha ayushman card se doctor ne bahut aache se meri mummy ka ilaz kiya or staff ne bhi bahut care ki thanku so much amaltas hospital' },
  { name: 'Pooj Paregi', lang: 'hi', about: "Father's treatment · Ayushman Yojana", image: card('11'), text: 'Amaltas Hospital में इलाज बहुत अच्छा होता है। मेरे गाँव से भी कई मरीज इलाज के लिए वहाँ जाते हैं। आयुष्मान योजना से यहाँ निःशुल्क इलाज किया जाता है, और मरीजों को आराम भी मिलता है। मेरे पिताजी का इलाज भी बहुत अच्छा हुआ। धन्यवाद अमलतास अस्पताल!' },
  { name: 'Manohar Rajput', lang: 'hi', about: 'Doctors & nursing care', image: card('19'), text: 'यहाँ का इलाज बहुत अच्छा है। डॉक्टर हर बात ध्यान से सुनते हैं और सही सलाह देते हैं। नर्सिंग स्टाफ बहुत सहयोगी है। मुझे यहाँ घर जैसा माहौल मिला। मैं सभी को सलाह दूँगा कि किसी भी बीमारी में एक बार यहाँ ज़रूर आएँ।' },
  { name: 'Sahrukh Khan', lang: 'hi-Latn', about: 'Free treatment · Ayushman Card', image: card('14'), text: 'Hamara ilaaj Ayushman Card se free mein hua hai. Saara staff bahut achha hai, sabne humein bahut achhe se sambhala. Dhanyawad Amaltas Hospital Dewas!' },
  { name: 'Vinod Lodhi', lang: 'hi', about: "Son's treatment", image: card('20'), text: 'मैंने अपने बेटे का इलाज अमलतास अस्पताल, देवास में कराया, जो बहुत ही बढ़िया तरीके से हुआ। किसी भी तरह की कोई दिक्कत नहीं आई, और हर चीज़ का पूरा ध्यान रखा गया।' },
  { name: 'Vicky Malviya', lang: 'hi', about: "Grandfather's operation", image: card('15'), text: 'बहुत ही अच्छा अस्पताल है। मेरे दादाजी का ऑपरेशन यहाँ बहुत सफल रहा। मैं बहुत खुश हूँ क्योंकि बड़े अस्पतालों ने मना कर दिया था। यहाँ के सभी डॉक्टर बहुत अच्छे हैं। धन्यवाद!' },
  { name: 'K Maheshwari', lang: 'hi', about: "Grandfather's operation", image: card('06'), text: 'बहुत ही बेहतरीन हॉस्पिटल है। मेरे दादाजी का ऑपरेशन सफलतापूर्वक हुआ। सभी डॉक्टरों की टीम को दिल से धन्यवाद!' },
  { name: 'Anmol Malviya', lang: 'hi-Latn', about: 'Delivery care', image: card('18'), text: 'Amaltas Hospital mein sabhi bimariyon ka ilaaj achhe se hota hai, aur delivery mein bhi koi dikkat nahi aati. Sabhi suvidhayein badiya hain. Dhanyavaad!' },
  { name: 'Manish Choudhary', lang: 'hi-Latn', about: 'Patient care', image: card('03'), text: 'Amaltas Hospital ka main bahut-bahut dhanyavaad karna chahta hoon, kyunki wahan par mareez ki dekhbhal bahut achhi hoti hai.' },
  { name: 'Rajkumar Malviya', lang: 'hi-Latn', about: 'Staff & environment', image: card('02'), text: 'Yaha ka mohol bahut hi sakaratmak hai or yaha kr staff bhi bhot ache hai yaha aane ke bad hame ghr jesa lagata hai' },
  { name: 'Ravi Sharma', lang: 'hi-Latn', about: 'Modern, affordable care', image: card('04'), text: 'Yahan ki medical suvidhaye aadhunik hain aur treatment kifayati aur dekhbhal bahut hi badiya hai.' },
  { name: 'Varsha Solanki', lang: 'hi', about: 'Care & respect', image: card('09'), text: 'अमलतास हॉस्पिटल सचमुच विश्वास का दूसरा नाम है — यहाँ हर मरीज को पूरी तरह से देखभाल और सम्मान मिलता है।' },
  { name: 'Suraj Choadiya', lang: 'hi', about: 'Caring staff', image: card('16'), text: 'Amaltas Hospital Dewas काफ़ी बेहतरीन अस्पताल है। यहाँ के डॉक्टर और कर्मचारी बहुत ही केयरिंग, सहयोगी और जिम्मेदार हैं।' },
  { name: 'Virendra Parmar', lang: 'hi', about: 'Facilities', image: card('17'), text: 'Amaltas Hospital Dewas एक बेहतरीन अस्पताल है। यहाँ हर सुविधा उपलब्ध है, और मरीजों को किसी भी प्रकार की परेशानी नहीं होती।' },
];

/** "Happy Patients" photos from the amaltashospital.in homepage (only small versions survive). */
export const happyPatientPhotos = ['01', '02', '03', '04'].map((n) => `/images/patients/happy-${n}.webp`);
