<?php
header("Content-Type: application/xml; charset=utf-8");

// Base URL
$domain = "https://bug2build.com";

// Static pages
$urls = [
  '/',
  '/about',
  '/contact',
  '/events',
  '/community'
];

// Start XML output
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

// Static pages
foreach ($urls as $url) {
  echo "<url><loc>$domain$url</loc><lastmod>" . date('Y-m-d') . "</lastmod></url>";
}

echo '</urlset>';
?>
