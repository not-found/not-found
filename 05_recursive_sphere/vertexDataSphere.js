var sphere = ( function() {

	function createVertexData(iterations) {

		// Positions.
		this.vertices = new Float32Array([
			1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, -1.0
		]);
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array([
			1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, -1.0
		]);
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array([
			0, 4, 4, 2, 2, 0,
			2, 4, 4, 1, 1, 2,
			1, 4, 4, 3, 3, 1,
			3, 4, 4, 0, 0, 3,
			0, 2, 2, 5, 5, 0,
			2, 1, 1, 5, 5, 2,
			1, 3, 3, 5, 5, 1,
			3, 0, 0, 5, 5, 3
		]);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array([
			0, 4, 2,
			2, 4, 1,
			1, 4, 3,
			3, 4, 0,
			0, 2, 5,
			2, 1, 5,
			1, 3, 5,
			3, 0, 5
		]);
		var indicesTris = this.indicesTris;
		var numberOfRecursions = iterations;

		for(var h = 0; h < numberOfRecursions; h++)
		{
			var numTriangles = this.indicesTris.length / 3;
			var newNumTriangles = numTriangles * 4;
			var newIndicesTris = new Int16Array(newNumTriangles * 3);
			var newIndicesLines = new Int16Array(newNumTriangles * 6);
			var newVertices = new Float32Array(newIndicesLines.length * 3);

			for(var i = 0; i < numTriangles; i++)
			{
				var x = 0, y = 1, z = 2;
				var iv0, iv1, iv2, v0, v1, v2, a, b, c;
				iv0 = this.indicesTris[i * 3];
				iv1 = this.indicesTris[i * 3 + 1]
				iv2 = this.indicesTris[i * 3 + 2];
				v0 = vec3.fromValues(this.vertices[iv0 * 3], this.vertices[iv0 * 3 + 1], this.vertices[iv0 * 3 + 2]);
				v1 = vec3.fromValues(this.vertices[iv1 * 3], this.vertices[iv1 * 3 + 1], this.vertices[iv1 * 3 + 2]);
				v2 = vec3.fromValues(this.vertices[iv2 * 3], this.vertices[iv2 * 3 + 1], this.vertices[iv2 * 3 + 2]);

				a = vec3.create();
				b = vec3.create();
				c = vec3.create();

				vec3.add(a, v0, v2);
				vec3.scale(a, a, 0.5);

				vec3.add(b, v0, v1);
				vec3.scale(b, b, 0.5);

				vec3.add(c, v1, v2);
				vec3.scale(c, c, 0.5);
				vec3.normalize(a, a);
				vec3.normalize(b, b);
				vec3.normalize(c, c);

				var vertixIndex = i * 6;
				var indexPointTris = i * 12;
				var indexPointLines = i * 4 * 6;

				newVertices[vertixIndex * 3] = v0[x];
				newVertices[vertixIndex * 3 + 1] = v0[y];
				newVertices[vertixIndex * 3 + 2] = v0[z];
				newVertices[(vertixIndex + 1) * 3] = b[x];
				newVertices[(vertixIndex + 1) * 3 + 1] = b[y];
				newVertices[(vertixIndex + 1) * 3 + 2] = b[z];
				newVertices[(vertixIndex + 2) * 3] = v1[x];
				newVertices[(vertixIndex + 2) * 3 + 1] = v1[y];
				newVertices[(vertixIndex + 2) * 3 + 2] = v1[z];
				newVertices[(vertixIndex + 3) * 3] = c[x];
				newVertices[(vertixIndex + 3) * 3 + 1] = c[y];
				newVertices[(vertixIndex + 3) * 3 + 2] = c[z];
				newVertices[(vertixIndex + 4) * 3] = v2[x];
				newVertices[(vertixIndex + 4) * 3 + 1] = v2[y];
				newVertices[(vertixIndex + 4) * 3 + 2] = v2[z];
				newVertices[(vertixIndex + 5) * 3] = a[x];
				newVertices[(vertixIndex + 5) * 3 + 1] = a[y];
				newVertices[(vertixIndex + 5) * 3 + 2] = a[z];

				newIndicesTris[indexPointTris] = vertixIndex;
				newIndicesTris[indexPointTris + 1] = vertixIndex + 1;
				newIndicesTris[indexPointTris + 2] = vertixIndex + 5;

				newIndicesTris[indexPointTris + 3] = vertixIndex + 1;
				newIndicesTris[indexPointTris + 4] = vertixIndex + 2;
				newIndicesTris[indexPointTris + 5] = vertixIndex + 3;

				newIndicesTris[indexPointTris + 6] = vertixIndex + 5;
				newIndicesTris[indexPointTris + 7] = vertixIndex + 1;
				newIndicesTris[indexPointTris + 8] = vertixIndex + 3;

				newIndicesTris[indexPointTris + 9] = vertixIndex + 5;
				newIndicesTris[indexPointTris + 10] = vertixIndex + 3;
				newIndicesTris[indexPointTris + 11] = vertixIndex + 4;

				newIndicesLines[indexPointLines] = vertixIndex;
				newIndicesLines[indexPointLines + 1] = vertixIndex + 1;
				newIndicesLines[indexPointLines + 2] = vertixIndex + 1;
				newIndicesLines[indexPointLines + 3] = vertixIndex + 5;
				newIndicesLines[indexPointLines + 4] = vertixIndex + 5;
				newIndicesLines[indexPointLines + 5] = vertixIndex;

				newIndicesLines[indexPointLines + 6] = vertixIndex + 1;
				newIndicesLines[indexPointLines + 7] = vertixIndex + 2;
				newIndicesLines[indexPointLines + 8] = vertixIndex + 2;
				newIndicesLines[indexPointLines + 9] = vertixIndex + 3;
				newIndicesLines[indexPointLines + 10] = vertixIndex + 3;
				newIndicesLines[indexPointLines + 11] = vertixIndex + 1;

				newIndicesLines[indexPointLines + 12] = vertixIndex + 5;
				newIndicesLines[indexPointLines + 13] = vertixIndex + 1;
				newIndicesLines[indexPointLines + 14] = vertixIndex + 1;
				newIndicesLines[indexPointLines + 15] = vertixIndex + 3;
				newIndicesLines[indexPointLines + 16] = vertixIndex + 3;
				newIndicesLines[indexPointLines + 17] = vertixIndex + 5;

				newIndicesLines[indexPointLines + 18] = vertixIndex + 5;
				newIndicesLines[indexPointLines + 19] = vertixIndex + 3;
				newIndicesLines[indexPointLines + 20] = vertixIndex + 3;
				newIndicesLines[indexPointLines + 21] = vertixIndex + 4;
				newIndicesLines[indexPointLines + 22] = vertixIndex + 4;
				newIndicesLines[indexPointLines + 23] = vertixIndex + 5;
			}

			this.vertices = newVertices;
			this.normals = newVertices;
			this.indicesTris = newIndicesTris;
			this.indicesLines = newIndicesLines;
		}
	}

	return {
		createVertexData : createVertexData
	}

}());
