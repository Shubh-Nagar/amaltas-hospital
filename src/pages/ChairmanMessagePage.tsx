import { Quote } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Placeholder } from '@/components/ui/Placeholder';

const chairman = {
  name: 'Mr. Mayankraj Singh Bhadoria',
  title: 'Chairman, Mayank Welfare Society',
  photo: '/images/about/chairman-mayankraj-singh-bhadoria.jpg',
};

/** Message text as published on amaltashospital.in/chairman-message. */
const message = [
  "India's large and diverse population warrants an efficient healthcare infrastructure that should be accessible to all classes of the society. Good quality healthcare should not be a privilege of the elite ones. Since we set up Amaltas Hospital in 2016, my vision and endeavour have been to bring state of the art healthcare to the masses of India. In order to achieve this, we at Amaltas Hospital, are committed to providing advanced medical care at a minimum possible cost.",
  'Our focus has always been on the patients of the lower and middle sections of the society, patients who are rejected by the large corporate hospitals, patients who cannot afford expensive medical care and patients who deserve empathy. I believe that medicine is a noble profession and sick must not be rejected on monetary grounds.',
  'Amaltas Hospital is the first private hospital in Dewas to handle all super speciality facilities. This state of the art hospital is equipped with all modern world-class equipments and facilities. Featuring multi-specialty and super-specialty departments, we provide premium healthcare to all.',
  'We bring together state of the art infrastructure, cutting-edge technology and a highly integrated and comprehensive information system along with a quest for exploring and developing newer therapies in medicine. A one of its kind facility in this part of the world through research, our hospitals integrates modern and traditional forms of medicine to provide accessible and affordable healthcare.',
  'Right from spending the time to guiding our patients about the current cost-effective course of actions, we provide world class healthcare services with empathy to our patients. I feel high gratitude when a patient recovers and goes back home. I sincerely wish them to be in sound health and they never require to visit a hospital for medical concerns.',
  'Amaltas Hospital was founded on the dream and vision of my father Shri Suresh Singh Bhadoria who always encouraged me to serve the people of my state and my country. The group now works to continue its legacy forward. Our focus towards Healthcare Education also got richer as we established new institutes including Amaltas Nursing College, Amaltas Institute of Homeopathy, Amaltas Institute of Ayurvedic, Amaltas Institute of Pharmacy, Amaltas Institute of Paramedical Science to provide new heights to Healthcare Education and generate more helping hands for the society. We have got the permission as Amaltas University by the state government. Our innovation and determination towards Women & Child Healthcare got even stronger as we recently established a new IVF and Special School facility center for world class care with a remarkable experience.',
  'I hope that in the future we continue to provide and extend further the best international standards quality care universally to every man, woman and child in whole India be they rich or poor.',
];

export default function ChairmanMessagePage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: "Chairman's Message", path: '/about/chairman-message' },
  ];
  return (
    <>
      <Seo title="Chairman's Message" description={`A message from ${chairman.name}, ${chairman.title}, on the vision behind Amaltas Hospital, Dewas.`} path="/about/chairman-message"
        jsonLd={[breadcrumbJsonLd(crumbs)]} />
      <PageHeader crumbs={crumbs} title="Chairman's Message" intro="Accessible, affordable, world-class healthcare for every section of society." image={pageImages.chairman} />

      <Container className="py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-start">
          <figure className="lg:sticky lg:top-28">
            <Placeholder
              asset={{ src: chairman.photo, alt: `${chairman.name}, ${chairman.title}`, width: 832, height: 1000 }}
              aspect="aspect-[832/1000]"
              className="shadow-card"
            />
            <figcaption className="mt-4">
              <p className="font-display text-xl font-semibold text-brand-800">{chairman.name}</p>
              <p className="text-sm text-muted">{chairman.title}</p>
            </figcaption>
          </figure>

          <article className="prose-editorial">
            <Quote className="h-10 w-10 text-brand-300" aria-hidden />
            {message.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <p className="font-display text-lg font-semibold text-brand-800">— {chairman.name}</p>
          </article>
        </div>
      </Container>
    </>
  );
}
