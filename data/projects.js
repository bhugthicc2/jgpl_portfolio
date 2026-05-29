const cvmsCaseStudy = {
  title: 'Cloud-Based Vehicle Monitoring System',
  subtitle:
    'A multi-platform Flutter application managing vehicle access control and administrative fleet operations through AES-128 encrypted QR identification.',
  metrics: [
    { label: 'Role', value: 'Solo Developer (Full-Stack)' },
    { label: 'Duration', value: '3 Weeks' },
    { label: 'Platforms', value: 'Windows Desktop & Android Mobile' },
  ],
  sections: [
    {
      title: 'System Architecture',
      type: 'paragraphs',
      content: [
        'The system utilizes a single Flutter codebase deployed to two platforms. The Windows Desktop App serves as the Admin Portal for managing vehicle records, monitoring onsite/offsite status, handling violations, and generating reports. The Android Mobile App is used by personnel on the ground to scan AES-128 encrypted QR codes embedded in MVP stickers affixed to vehicles — identifying them and logging entry or exit events synced instantly through Cloud Firestore.',
      ],
    },
    {
      title: 'Problem & Goal',
      type: 'notes',
      items: [
        {
          label: 'Problem',
          content:
            'Manual vehicle identification and access control relied on visual checks and paper logs, creating security vulnerabilities, inconsistent record-keeping, and no centralized visibility into vehicle presence or violations.',
        },
        {
          label: 'Goal',
          content:
            'To build a secure, automated cross-platform ecosystem where vehicles are identified via encrypted QR codes, access events are logged without human error, and administrators have full real-time oversight of fleet status, violations, and sanctions.',
        },
      ],
    },
    {
      title: 'Technical Challenge & Solution',
      type: 'labeled-paragraphs',
      items: [
        {
          label: 'Challenge',
          content:
            'QR codes embedded in publicly exposed MVP stickers needed to carry vehicle identity data without being spoofable or readable by unauthorized parties, since any phone camera could potentially scan them.',
        },
        {
          label: 'Solution',
          content:
            'I implemented AES-128 encryption on all QR code payloads before generation. The mobile app decrypts the scanned data at runtime using a secured key, ensuring that raw QR content is unreadable outside the system. Only authenticated personnel with the mobile app can resolve a scan to a valid vehicle identity.',
        },
      ],
      codeSnippet: `import 'package:encrypt/encrypt.dart' as encrypt;

String encryptVehiclePayload(String plainText) {
  final key = encrypt.Key.fromUtf8(const String.fromEnvironment('AES_KEY'));
  final iv = encrypt.IV.fromSecureRandom(16);
  final encrypter = encrypt.Encrypter(
    encrypt.AES(key, mode: encrypt.AESMode.cbc),
  );

  final encrypted = encrypter.encrypt(plainText, iv: iv);
  // Prefix IV to ciphertext for decryption on scan
  return '\${iv.base64}:\${encrypted.base64}';
}

String decryptVehiclePayload(String cipherText) {
  final key = encrypt.Key.fromUtf8(const String.fromEnvironment('AES_KEY'));
  final parts = cipherText.split(':');
  final iv = encrypt.IV.fromBase64(parts[0]);
  final encrypter = encrypt.Encrypter(
    encrypt.AES(key, mode: encrypt.AESMode.cbc),
  );

  return encrypter.decrypt64(parts[1], iv: iv);
}`,
    },
    {
      title: 'Key Features Developed',
      type: 'list',
      items: [
        'AES-128 Encrypted QR Generation: Vehicle identity data is encrypted before being embedded into MVP sticker QR codes, preventing unauthorized identification or spoofing.',
        'Mobile QR Scanner: Android app decrypts and resolves scanned stickers to vehicle records in real time, logging access and entry/exit events to Firestore.',
        'Admin Portal: Full vehicle record management, onsite/offsite monitoring, violation tracking, sanction management, and report generation from a centralized Windows desktop interface.',
        'Role-Based Access Control: Secure authentication separating ground personnel (mobile scanners) from administrators (desktop portal).',
      ],
    },
  ],
};

export const projects = [
  {
    title:       'Cloud-based Vehicle Monitoring System - Desktop App',
    description: 'A Flutter-based vehicle monitoring system using QR codes and Firebase Firestore for real-time tracking and AES-encrypted payloads designed for JRMSU - KC CDRRMSU.',
    image: 'assets/images/projects/cvms/cover.png',
    images:      [
      'assets/images/projects/cvms/cvms4.png',
      'assets/images/projects/cvms/cvms.png',
      'assets/images/projects/cvms/cvms5.png',
      'assets/images/projects/cvms/cvms9.png',
      'assets/images/projects/cvms/cvms2.png',
      'assets/images/projects/cvms/cvms3.png',
      'assets/images/projects/cvms/cvms10.png',
      'assets/images/projects/cvms/cvms8.png',
      'assets/images/projects/cvms/cvms7.png',
      'assets/images/projects/cvms/cvms1.png',
      'assets/images/projects/cvms/cvms6.png',
    ],
    techStack:   ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Provider', 'AES'],
    caseStudy:   cvmsCaseStudy,
    githubUrl:   null,
    liveUrl:     null,
  },
  {
    title:       'Cloud-based Vehicle Monitoring System - Mobile App',
    description: 'A Flutter-based vehicle monitoring system using QR codes and Firebase Firestore for real-time tracking and AES-encrypted payloads designed for JRMSU - KC CDRRMSU.',
    image: 'assets/images/projects/cvms/mobile/cover.png',
    images:      [
      'assets/images/projects/cvms/mobile/splash.png',
      'assets/images/projects/cvms/mobile/login.png',
      'assets/images/projects/cvms/mobile/home.png',
      'assets/images/projects/cvms/mobile/profile.png',
      'assets/images/projects/cvms/mobile/scan_entry.png',
      'assets/images/projects/cvms/mobile/drawer.png',

    ],
    techStack:   ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Provider', 'AES'],
    caseStudy:   cvmsCaseStudy,
    githubUrl:   null,
    liveUrl:     null,
  },
    {
    title:       'JRMSU CCS Dean\'s Office Visitors Log System - Mobile App',
    description: 'A QR-based visitor registration and log system for JRMSU CCS, built with Flutter and Firebase for real-time visitor tracking.',
    image: 'assets/images/projects/cvls/mobile/mobile-cover.png',
    images: [
      'assets/images/projects/cvls/mobile/splash.png',
      'assets/images/projects/cvls/mobile/sign-up.png',
      'assets/images/projects/cvls/mobile/login.png',
      'assets/images/projects/cvls/mobile/forgot-pass.png',
      'assets/images/projects/cvls/mobile/home-open.png',
      
      'assets/images/projects/cvls/mobile/sched.png',
      'assets/images/projects/cvls/mobile/visit-purpose.png',
      'assets/images/projects/cvls/mobile/scan.png',
      'assets/images/projects/cvls/mobile/drawer.png',
      'assets/images/projects/cvls/mobile/about.png',
      'assets/images/projects/cvls/mobile/info.png',
      
      'assets/images/projects/cvls/mobile/logout.png',
    ],
    techStack:   ['Flutter', 'Dart', 'Firebase'],
    githubUrl:   null,
    liveUrl:     null,
  },
  {
    title:       'JRMSU CCS Dean\'s Office Visitors Log System - Desktop App',
    description: 'A QR-based visitor registration and log system for JRMSU CCS, built with Flutter and Firebase for real-time visitor tracking.',
    image: 'assets/images/projects/cvls/cover.png',
    images:      [
      'assets/images/projects/cvls/visitors_log1.png',
      'assets/images/projects/cvls/visitors_log.png',
      'assets/images/projects/cvls/v_log.png',
      'assets/images/projects/cvls/visitors_log2.png',
      'assets/images/projects/cvls/visitors_log3.png',
      'assets/images/projects/cvls/visitors_log4.png',
      'assets/images/projects/cvls/visitors_log5.png',
      'assets/images/projects/cvls/hours.png',
    ],
    techStack:   ['Flutter', 'Dart', 'Firebase'],
    githubUrl:   null,
    liveUrl:     null,
  },
  {
    title:       'Gapz Graphics Portfolio Website',
    description: 'A personal graphic design portfolio website showcasing branding and visual design work.',
    image: 'assets/images/projects/portfolio/gapz_graphix.png',
    images:      [
      'assets/images/projects/portfolio/gapz_graphix1.png',
      'assets/images/projects/portfolio/gapz_graphix.png',
      'assets/images/projects/portfolio/gapz_graphix2.png',
      'assets/images/projects/portfolio/gapz_graphix3.png',
      'assets/images/projects/portfolio/gapz_graphix4.png',
    ],
    techStack:   ['HTML', 'CSS', 'JavaScript'],
    githubUrl:   null,
    liveUrl:     'https://jesiegapol23.github.io/gapzgraphix',
  },
  {
    title:       'Records Management System - Desktop App',
    description: 'An offline support records management system for JRMSU - Records Office.',
    image: 'assets/images/projects/records/login.png',
    images:      [
      'assets/images/projects/records/login.png',
      'assets/images/projects/records/dashboard.png',
      'assets/images/projects/records/add.png',
      'assets/images/projects/records/docs.png',
      'assets/images/projects/records/report.png',
    ],
    techStack:   ['Flutter', 'Dart', 'SQLite'],
    githubUrl:   null,
    liveUrl:     null,
  },

  {
    title:       'Messenger Clone',
    description:  'A modern messaging app UI/UX case study inspired by Messenger, featuring onboarding flows, customizable chat themes, authentication screens, notifications, and interactive chat interfaces built with Flutter.',
    image: 'assets/images/projects/messenger-clone/cover.png',
    images:      [
      'assets/images/projects/messenger-clone/login.png',
      'assets/images/projects/messenger-clone/onboarding-1.png',
      'assets/images/projects/messenger-clone/gender.png',
      'assets/images/projects/messenger-clone/birthday.png',
          'assets/images/projects/messenger-clone/email.png',
      'assets/images/projects/messenger-clone/password.png',
        'assets/images/projects/messenger-clone/terms.png',
      'assets/images/projects/messenger-clone/chats.png',
      'assets/images/projects/messenger-clone/cool-crew-theme.png',
      'assets/images/projects/messenger-clone/avatar-theme.png',
         'assets/images/projects/messenger-clone/theme-selection.png',
      'assets/images/projects/messenger-clone/chat-info.png',
      'assets/images/projects/messenger-clone/notifs.png',
         'assets/images/projects/messenger-clone/menu.png',
    ],
    techStack:   ['Flutter', 'Dart', 'Firebase'],
    githubUrl:   null,
    liveUrl:     null,
  },
  
  {
    title:       'Storemate - Mobile App',
    description: 'StoreMate is a companion app designed for small shops and convenience stores.',
    image: 'assets/images/projects/store_mate/dashboard_cover.png',
    images:      [
      'assets/images/projects/store_mate/splash.png',
      'assets/images/projects/store_mate/register.png',
      'assets/images/projects/store_mate/login.png',
      'assets/images/projects/store_mate/forgot_password.png',
      'assets/images/projects/store_mate/dashboard.png',
      'assets/images/projects/store_mate/add_cart.png',
      'assets/images/projects/store_mate/check_out_receipt.png',
      'assets/images/projects/store_mate/products.png',
    ],
    techStack:   ['Kotlin', 'XML', 'Firebase'],
    githubUrl:   null,
    liveUrl:     null,
  },

   {
    title:       'Tarpaulin Design',
    description: 'Designed Tarpaulin layouts using adobe photoshop.',
    image:       'assets/images/projects/graphics/tarp-design.png',
    images:      [
      'assets/images/projects/graphics/tarp-design.png',
     
    ],
    techStack:   ['Adobe Photoshop'],
    githubUrl:   null,
    liveUrl:     null,
  },
  // {
  //   title:       'JRMSU K Sports Fest 2026 — CCS Basketball Jersey Design',
  //   description: 'Basketball Jersey Design for JRMSU - KC CCS during Sports Fest 2026.',
  //   image:       'assets/images/projects/graphics/design3.png',
  //   images:      [
  //     'assets/images/projects/graphics/design1.png',
  //     'assets/images/projects/graphics/design2.png',
  //     'assets/images/projects/graphics/design3.png',
  //   ],
  //   techStack:   ['Adobe Photoshop', 'Adobe Illustrator'],
  //   githubUrl:   null,
  //   liveUrl:     null,
  // },
    {
    title:       'JRMSU K Sports Fest 2026 — Shirt Design I',
    description: 'Shirt design contribution for JRMSU K Sports Fest 2026, created using Adobe Photoshop and Illustrator.',
    image:       'assets/images/projects/graphics/design1.png',
    images:      [
      'assets/images/projects/graphics/design1.png',
      'assets/images/projects/graphics/design2.png',
      'assets/images/projects/graphics/design3.png',
    ],
    techStack:   ['Adobe Photoshop', 'Adobe Illustrator'],
    githubUrl:   null,
    liveUrl:     null,
  },
];
