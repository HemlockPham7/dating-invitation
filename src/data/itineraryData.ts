import type { InvitationConfig, TimelineStop } from '../types/itinerary';

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const invitationConfig: InvitationConfig = {
  recipientName: 'Bé Hân',
  occasionDate: '13 / 12',
  occasionTitle: 'Birthday Date Invitation',
  heroHeadline: 'Bé Hân ơi, ngày 13/12 này đi đón sinh nhật cùng Việt Hoàng nhé?',
  heroSubtext:
    'Việt Hoàng đã chuẩn bị sẵn một hành trình nho nhỏ — không vội vàng, không giờ giấc, chỉ có bé Hân, Việt Hoàng và những điều dễ thương.',
  evasiveMessages: [
    'Từ chối',
    'Ơ kìa, bấm nhầm rồi!',
    'Nút này đang bảo trì nha 🛠️',
    'Thử bấm Đồng ý bên kia kìa!',
    'Không bắt được đâu~',
    'Suy nghĩ lại đi mà 🥺',
    'Sinh nhật mà, đi đi!',
    'Hết đường chạy rồi… đùa thôi',
    'Nút Đồng ý đẹp hơn đó',
    'Okay, chỉ còn một lựa chọn thôi 💗',
  ],
};

export const timelineStops: TimelineStop[] = [
  {
    id: 'pickup',
    stepNumber: '01',
    categoryTag: 'THE PICK-UP',
    title: 'Đón Bé Hân',
    subtitle: 'Mở màn ngày đặc biệt',
    description:
      'Khởi đầu ngày sinh nhật 13/12. Việt Hoàng sẽ qua tận nơi đón nhân vật chính của ngày hôm nay — bé Hân cứ thong thả lên đồ thật xinh nha.',
    imageUrl: '/images/stop-01-pickup.svg',
    imageAlt: 'Minh họa chiếc xe nhỏ chở trái tim đến đón',
    icon: 'car',
    side: 'left',
  },
  {
    id: 'dinner',
    stepNumber: '02',
    categoryTag: 'BIRTHDAY DINNER',
    title: 'Ăn tối & Mừng sinh nhật',
    subtitle: 'Thổi nến, ước một điều',
    description:
      'Một bữa tối ấm cúng, ngon miệng và cùng nhau thổi nến mừng tuổi mới của bé Hân.',
    locationName: 'Wok of Love — Quận 2',
    address: 'Quận 2, TP. Hồ Chí Minh',
    googleMapsUrl: mapsSearch('Wok of Love Quận 2 Hồ Chí Minh'),
    imageUrl: '/images/stop-02-wokoflove.svg',
    imageAlt: 'Minh họa bánh sinh nhật và bàn ăn tối',
    icon: 'utensils',
    side: 'right',
  },
  {
    id: 'photobooth',
    stepNumber: '03',
    categoryTag: 'CAPTURE THE MOMENT',
    title: 'Chụp hình Photobooth',
    subtitle: 'Lưu lại khoảnh khắc',
    description:
      'Cùng tạo dáng thật lầy, thật xinh và lưu giữ những tấm hình kỷ niệm ngày sinh nhật 13/12.',
    locationName: 'Photogenic Bình Thạnh',
    address: '490D Điện Biên Phủ, Thạnh Mỹ Tây, Hồ Chí Minh 70000, Việt Nam',
    googleMapsUrl: mapsSearch(
      'Photogenic Bình Thạnh, 490D Điện Biên Phủ, Thạnh Mỹ Tây, Hồ Chí Minh 70000, Việt Nam',
    ),
    imageUrl: '/images/stop-03-photogenic.svg',
    imageAlt: 'Minh họa dải ảnh photobooth',
    icon: 'camera',
    side: 'left',
  },
  {
    id: 'dessert',
    stepNumber: '04',
    categoryTag: 'SWEET AFTERGLOW',
    title: 'Dạo phố & Tráng miệng',
    subtitle: 'Chậm lại một chút',
    description:
      'Đi dạo hóng gió, thưởng thức một món tráng miệng ngọt ngào và kể nhau nghe đủ thứ chuyện.',
    imageUrl: '/images/stop-04-dessert.svg',
    imageAlt: 'Minh họa ly kem dưới ánh đèn phố',
    icon: 'ice-cream',
    side: 'right',
  },
  {
    id: 'home',
    stepNumber: '05',
    categoryTag: 'SAFE & SOUND',
    title: 'Đưa Bé Hân về',
    subtitle: 'Khép lại thật trọn vẹn',
    description:
      'Đưa bé Hân về tận nhà an toàn, khép lại buổi hẹn sinh nhật 13/12 thật trọn vẹn và ấm áp.',
    imageUrl: '/images/stop-05-home.svg',
    imageAlt: 'Minh họa ngôi nhà nhỏ với trái tim',
    icon: 'home-heart',
    side: 'left',
  },
];

