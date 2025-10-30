// Test script for upload functionality
const fs = require('fs');
const path = require('path');

async function testUpload() {
  console.log('Testing upload functionality...');

  // Create a simple test image (1x1 PNG pixel)
  const testImageBuffer = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
    0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x05, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xF9, 0x6A, 0x22, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E,
    0x44, 0xAE, 0x42, 0x60, 0x82
  ]);

  // Save the test image to a file
  const testImagePath = path.join(__dirname, 'test-image.png');
  fs.writeFileSync(testImagePath, testImageBuffer);

  try {
    // Import dependencies dynamically
    const { default: fetch } = await import('node-fetch');
    const FormData = (await import('form-data')).default;

    // Create FormData and append the test image
    const formData = new FormData();
    formData.append('file', fs.createReadStream(testImagePath), {
      filename: 'test-image.png',
      contentType: 'image/png'
    });

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Note: This would need proper authentication in real test
        // For now, we'll test without auth to see auth error
      }
    });

    const responseText = await response.text();

    if (response.ok) {
      const jsonResponse = JSON.parse(responseText);
      console.log('✅ Upload successful');
      console.log('Response:', JSON.stringify(jsonResponse, null, 2));

      // Check if response matches expected format
      if (jsonResponse.url && typeof jsonResponse.url === 'string') {
        console.log('✅ Response contains expected "url" field');

        // Check if URL matches expected cloudinary pattern
        if (jsonResponse.url.includes('cloudinary.com') && jsonResponse.url.includes('midas-products')) {
          console.log('✅ URL matches cloudinary pattern for midas-products folder');
        } else {
          console.log('⚠️ URL pattern may not match expected format');
        }
      } else {
        console.log('❌ Response does not contain expected "url" field');
        console.log('Expected: { "url": "https://res.cloudinary.com/.../midas-products/..." }');
        console.log('Got:', jsonResponse);
      }
    } else {
      console.log('❌ Upload failed with status:', response.status);
      console.log('Response:', responseText);

      // Check if it's auth error
      if (response.status === 401 && responseText.includes('Unauthorized')) {
        console.log('ℹ️ This is expected if no authentication is provided');
        console.log('To fully test, you would need to authenticate as admin first');
      }
    }

  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  } finally {
    // Clean up test image
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  }
}

// Run the test
testUpload().catch(console.error);
