const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'style_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes
app.get('/api/styles', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM STYLE');
    const total = countResult[0].total;

    // Get paginated data
    const [rows] = await pool.query('SELECT * FROM STYLE LIMIT ? OFFSET ?', [limit, offset]);

    res.json({
      data: rows,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching styles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/styles/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM STYLE WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Style not found' });
    }
    const style = rows[0];

    // Fetch related data
    const [
      accessories,
      brands,
      psychologicalProfile,
      events,
      locations,
      combinations,
      childStyles,
      parentStyles,
      moods,
      colorPalette,
      fabrics,
      icons,
      symbols,
      criticisms,
      hairAndMakeup,
      trendStatus,
      mediaReferences,
      hybridStyles,
      usageToday,
      historicalEvolution,
      contrastingStyles,
      relatedStyles,
      ageGroups,
      originLocations
    ] = await Promise.all([
      pool.query('SELECT * FROM ACCESSORY WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM BRAND WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM PSYCHOLOGICAL_PROFILE WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM EVENT WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM LOCATION WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM COMBINATION WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM CHILD_STYLE WHERE parent_style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM PARENT_STYLE WHERE child_style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM MOOD WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM COLOR_PALETTE WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM FABRIC WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM ICON WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM SYMBOL WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM CRITICISM WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM HAIR_AND_MAKEUP WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM TREND_STATUS WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM MEDIA_REFERENCE WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM HYBRID_STYLE WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM USAGE_TODAY WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM HISTORICAL_EVOLUTION WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM CONTRASTING_STYLE WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM RELATED_STYLE WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM AGE_GROUP WHERE style_id = ?', [req.params.id]),
      pool.query('SELECT * FROM ORIGIN_LOCATION WHERE style_id = ?', [req.params.id])
    ]);

    // Combine all data
    const styleWithDetails = {
      ...style,
      accessories: accessories[0],
      brands: brands[0],
      psychological_profile: psychologicalProfile[0][0],
      events: events[0],
      locations: locations[0],
      combinations: combinations[0],
      child_styles: childStyles[0],
      parent_styles: parentStyles[0],
      moods: moods[0],
      color_palette: colorPalette[0][0],
      fabrics: fabrics[0],
      icons: icons[0],
      symbols: symbols[0],
      criticisms: criticisms[0],
      hair_and_makeup: hairAndMakeup[0][0],
      trend_status: trendStatus[0][0],
      media_references: mediaReferences[0],
      hybrid_styles: hybridStyles[0],
      usage_today: usageToday[0][0],
      historical_evolution: historicalEvolution[0][0],
      contrasting_styles: contrastingStyles[0],
      related_styles: relatedStyles[0],
      age_groups: ageGroups[0],
      origin_locations: originLocations[0]
    };

    res.json(styleWithDetails);
  } catch (error) {
    console.error('Error fetching style details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 